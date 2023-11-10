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

app.post('/save-workout', async (req, res) => {
    try {
        const { workout, minutes, calories } = req.body;
        const currentDate = new Date();

        // Suchen nach vorhandenen Daten für den aktuellen Tag
        let existingWorkout = await Workout.findOne({
            date: {
                $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
            },
        });

        if (existingWorkout) {
            // Wenn Daten vorhanden sind, aktualisiere sie durch Hinzufügen der neuen Werte
            existingWorkout.workout += workout;
            existingWorkout.minutes += minutes;
            existingWorkout.calories += calories;
        } else {
            // Wenn keine Daten vorhanden sind, erstelle einen neuen Eintrag
            existingWorkout = new Workout({
                workout,
                minutes,
                calories,
                date: currentDate, // Füge das aktuelle Datum hinzu
            });
        }

        // Speichere das Workout (neu erstellten oder aktualisierten Eintrag)
        await existingWorkout.save();

        // Rufe die aktualisierten Daten erneut ab und sende sie als JSON-Antwort
        const updatedWorkoutData = await Workout.findOne({
            date: {
                $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
            },
        });

        res.status(200).json({
            workout: updatedWorkoutData.workout,
            calories: updatedWorkoutData.calories,
            minutes: updatedWorkoutData.minutes,
        });
    } catch (error) {
        console.log("Error saving workout: " + error);
        res.status(500).json({ message: "Error saving workout" });
    }
});



// Füge diese Zeilen zu deiner index.js-Datei hinzu

// Endpoint zum Abrufen von Workout-Daten für den aktuellen Tag
app.get('/get-workout', async (req, res) => {
    try {
        const currentDate = new Date();

        // Suche nach Workout-Daten für den aktuellen Tag in der Datenbank
        const workoutData = await Workout.findOne({
            date: {
                $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
                $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
            },
        });

        if (workoutData) {
            // Wenn Daten vorhanden sind, sende sie als JSON-Antwort
            res.status(200).json({
                workout: workoutData.workout,
                calories: workoutData.calories,
                minutes: workoutData.minutes,
            });
        } else {
            // Wenn keine Daten vorhanden sind, sende eine leere Antwort
            res.status(200).json({});
        }
    } catch (error) {
        console.log("Fehler beim Abrufen der Workout-Daten: " + error);
        res.status(500).json({ message: "Fehler beim Abrufen der Workout-Daten" });
    }
});


