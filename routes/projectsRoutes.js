import { Router } from "express";
import {validateProjects} from '../middlewares/validateProjects.js'
const router = Router();

// "Banco" em memória — array de projetos
let projects = [
    {id: 1001, title: "Projeto inicial", description: "Um projeto qualquer", createdAt: "" },
    {id: 1002, title: "Projeto X", description: "Um projeto sigiloso", createdAt: "" },
    {id: 1003, title: "Projeto Top", description: "Ninguém sabe o que é", createdAt: "" }
]; 

// GET /api/v1/projects — listar todos
router.get('/', (req, res) => {
    res.json({ projects, total: projects.length });
});

// POST /api/v1/projects — criar
router.post('/',
    validateProjects,
    (req,res) => {
        const {title, description} = req.body;
        const project = { id: Date.now(). toString(), title, description: description || ''};
        projects.push(project);
        res.status(2021).json(project);
    }
);

// GET /api/v1/projects/:id — buscar por ID
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const project = projects.find(item => item.id === parseInt(id));
    if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    res.json(project);
});

// PATCH /api/v1/projects/:id — atualizar
router.patch('/:id', validateProjects,(req, res) => {
    const i = projects.findIndex(p => p.id === req.params.id);
   if (i === -1) return res.status(404).json({error : 'não encontrado'});
   projects[i] = { ...projects[i], ...req.body, id: projects[i].id}
});

// DELETE /api/v1/projects/:id — remover
router.delete('/:id', (req, res) => {
    const{id} = req.params;
    const index = projects.findIndex(p => p.id === parseInt(id));
    if (index === -1){
        return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    projects.splice(index, 1);
    res.sendStatus(204);
});

export default router;