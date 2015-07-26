var models = require("../models/models");

// GET /quizes/statistics
exports.index = function(req, res) {
    models.Quiz.findAll({
        include: [{ model: models.Comment }]
    }).then(function (quizes) {
            if (quizes) {
                var nQuiz = 0;
                var nComments = 0;
                var nQuizNoComments = 0;

                // Cálculos
                quizes.forEach(function (quiz) {
                    nQuiz++;
                    nComments += quiz.Comments.length;
                    if (quiz.Comments.length === 0) {
                        nQuizNoComments++;
                    }
                });
                // RENDERIZADO. Importante errors
                res.render('statistics/index', {nQuiz: nQuiz, nComments: nComments, nQuizNoComments: nQuizNoComments, errors: []});
            
            } else {
                next(new Error('No hay preguntas'));
            }
        }).catch(function(err) {
            next(err);
    });
};

