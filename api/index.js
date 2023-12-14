const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://dzhamsk:Logitech123!@cluster0.dthkxli.mongodb.net/kenkofit?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ");
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

const User = require('./models/user');
const Workout = require('./models/workout');
const { send } = require('process');

//endpoint to register a user
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-Mail Adresse bereits registriert" });
        }

        // Hash das Passwort
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user mit gehashtem Passwort
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        // save the user
        await newUser.save();

        // send the verification email
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(200).json({ message: "Registrierung erfolgreich" });
    } catch (error) {
        console.log("Fehler beim Registrieren: " + error);
        res.status(500).json({ message: "Fehler beim Registrieren: " });
    }
});

const sendVerificationEmail = async (email, verificationToken) => {
    // create a nodemailer transporter

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dzhamsk@gmail.com',
            pass: 'ubhy zsqa thhe tolw'
        }
    });

    // send mail using transporter
    const mailOptions = {
        from: "kenkofit",
        to: email,
        subject: "E-Mail Adresse bestätigen",
        text: `Bitte klicke auf den folgenden Link, um deine E-Mail Adresse zu bestätigen: http://localhost:3000/verify/${verificationToken}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Fehler beim Senden der E-Mail: " + error);
    }
}

app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Token ungültig" });
        }

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
    } catch (error) {
        console.log("Fehler beim Verifizieren: " + error);
        res.status(500).json({ message: "Fehler beim Verifizieren" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
};

const secretKey = generateSecretKey();

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "E-Mail Adresse nicht registriert" });
        }

        // Vergleiche das eingegebene Passwort mit dem gehashten Passwort in der Datenbank
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Passwort falsch" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Einloggen" });
    }
});

// Füge diese Route am Anfang deines Servercodes hinzu
app.get('/get-todays-workout', async (req, res) => {
    try {
        const currentDate = new Date();
        const workout = await Workout.findOne({
            date: {
                $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
            },
        });

        if (!workout) {
            return res.status(404).json({ message: "Kein Workout für heute gefunden" });
        }

        res.status(200).json({
            calories: workout.calories,
            workout: workout.workout,
            minutes: workout.minutes,
        });
    } catch (error) {
        console.error("Fehler beim Abrufen des heutigen Workouts:", error);
        res.status(500).json({ message: "Fehler beim Abrufen des Workouts" });
    }
});

app.post('/update-todays-workout', async (req, res) => {
    try {
        const { workout, calories, minutes } = req.body;

        // Überprüfen, ob das Workout größer als 0 ist
        if (workout > 0) {
            const currentDate = new Date();
            const existingWorkout = await Workout.findOne({
                date: {
                    $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                    $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
                },
            });

            if (existingWorkout) {
                existingWorkout.workout = workout;
                existingWorkout.calories = calories;
                existingWorkout.minutes = minutes;
                await existingWorkout.save();
            } else {
                const newWorkout = new Workout({
                    workout,
                    calories,
                    minutes,
                    date: currentDate,
                });
                await newWorkout.save();
            }

            res.status(200).json({ message: "Workout-Daten aktualisiert" });
        } else {
            res.status(400).json({ message: "Workout-Wert muss größer als 0 sein" });
        }
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Workout-Daten:", error);
        res.status(500).json({ message: "Fehler beim Aktualisieren der Workout-Daten" });
    }
});


app.get('/get-workout-by-date/:date', async (req, res) => {
    try {
        const selectedDate = new Date(req.params.date);

        // Assuming you have a Workout model
        const workout = await Workout.findOne({
            date: {
                $gte: selectedDate,
                $lt: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1),
            },
        });

        if (!workout) {
            return res.status(404).json({ message: "Kein Workout für ausgewähltes Datum gefunden" });
        }

        res.status(200).json({
            calories: workout.calories,
            workout: workout.workout,
            minutes: workout.minutes,
        });
    } catch (error) {
        console.error("Fehler beim Abrufen des Workouts für ausgewähltes Datum:", error);
        res.status(500).json({ message: "Fehler beim Abrufen des Workouts" });
    }
});

app.get('/get-workout-dates', async (req, res) => {
    try {
        // Abrufen aller einzigartigen Datumsangaben, an denen Workouts stattgefunden haben
        const dates = await Workout.distinct('date');

        // Formatieren der Datumsangaben für die Rückgabe (optional)
        const formattedDates = dates.map(date => date.toISOString().split('T')[0]);

        res.json(formattedDates);
    } catch (error) {
        console.error("Fehler beim Abrufen der Workout-Daten:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Workout-Datumsangaben" });
    }
});

