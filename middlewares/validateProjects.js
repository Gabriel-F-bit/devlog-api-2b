// middlewares/validadeProjects.js

export function validadeProjects(req, res, next){
    const{title, descripition} = req.body;


const errors = [];

if(!title){
    errors.push('O campo title é obrigatório');
}
if(title && title.trim().length<3){
    errors.push('title deve ter ao menos 3 caracteres')
}
if(title && title.trim().length>500){
    errors.push('title deve ter no máximo 500 caracteres')
}
if(errors.length > 0) {
    return res.status(400).json ({errors});
}

next();

}