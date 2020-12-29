exports.registerEmailParamsForSuperAdmin = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Vefiry your email address</h1>
                            <p>Please use the following link to complete your registration:</p>
                            <p>${process.env.CLIENT_URL}/super-admin/activate/${token}</p>
                        </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    };
};
exports.registerEmailParamsForAdmin = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Vérification de votre adresse e-mail</h1>
                            <p>Veuillez utiliser le lien ci-dessous pour finir votre inscription:</p>
                            <p>${process.env.CLIENT_URL}/admin/activate/${token}</p>
                        </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    };
};

exports.registerEmailParamsForUser = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Vérification de votre adresse e-mail</h1>
                            <p>Veuillez utiliser le lien ci-dessous pour finir votre inscription:</p>
                            <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
                        </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Vérification de votre email'
            }
        }
    };
};
exports.forgotPasswordEmail = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Réinitialisation du mot de passe</h1>
                            <p>Veuillez utiliser le lien ci-dessous pour modifier votre mot de passe:</p>
                            <p>${process.env.CLIENT_URL}/user/update-password/${token}</p>
                        </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Renouvellement du mot de passe'
            }
        }
    };
};