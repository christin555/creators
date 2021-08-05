const router = require('express').Router();
const userController = require('../controllers/user');
const { verifySignUp } = require('../middleware');
// const regEmail = require('../emails/registration');
// const resetEmail = require('../emails/reset');

// We need a service that will help us automate
// the restoration of access and confirmation of registration
// etc. SendGrid, SendPulse or other
// const transporter = nodemailer.createTransport(
//     sendgrid({
//         auth: { api_key: keys.SENDGRID_API_KEY },
//     })
// );

router.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
});

router.get('/login', async (req, res) => {
    res.sendStatus(200);
});

router.post('/login', userController.login);

router.get('/register', async (req, res) => {
    res.sendStatus(200);
});

router.post(
    '/register',
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkPassword],
    userController.register
);

// router.get('/password/:token', async (req, res) => {
//     if (!req.params.token) {
//         return res.redirect('/auth/login');
//     }

//     try {
//         const user = await User.findOne({
//             resetToken: req.params.token,
//             resetTokenExp: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.redirect('/auth/login');
//         } else {
//             res.render('auth/password', {
//                 title: 'Восстановить доступ',
//                 error: req.flash('error'),
//                 userId: user._id.toString(),
//                 token: req.params.token,
//             });
//         }
//     } catch (e) {
//         console.log(e);
//     }
// });

// router.post('/reset', (req, res) => {
//     try {
//         crypto.randomBytes(32, async (err, buffer) => {
//             if (err) {
//                 req.flash(
//                     'error',
//                     'Что-то пошло не так, повторите попытку позже'
//                 );
//                 return res.redirect('/auth/reset');
//             }

//             const token = buffer.toString('hex');
//             const candidate = await User.findOne({ email: req.body.email });

//             if (candidate) {
//                 candidate.resetToken = token;
//                 candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
//                 await candidate.save();
//                 await transporter.sendMail(resetEmail(candidate.email, token));
//                 res.redirect('/auth/login');
//             } else {
//                 req.flash('error', 'Такого email нет');
//                 res.redirect('/auth/reset');
//             }
//         });
//     } catch (e) {
//         console.log(e);
//     }
// });

// router.post('/password', async (req, res) => {
//     try {
//         const user = await User.findOne({
//             _id: req.body.userId,
//             resetToken: req.body.token,
//             resetTokenExp: { $gt: Date.now() },
//         });

//         if (user) {
//             user.password = await bcrypt.hash(req.body.password, 10);
//             user.resetToken = undefined;
//             user.resetTokenExp = undefined;
//             await user.save();
//             res.redirect('/auth/login');
//         } else {
//             req.flash('loginError', 'Время жизни токена истекло');
//             res.redirect('/auth/login');
//         }
//     } catch (e) {
//         console.log(e);
//     }
// });

module.exports = router;
