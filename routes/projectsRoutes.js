import { Router } from "express";
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
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title){
         return res.status(400).json({ error: 'title é obrigatório' });
    }
    const project = {
        id: parseInt(Date.now().toString()), 
        title: title, 
        description: description || '',
        createdAt: new Date().toISOString()
    };
    projects.push(project);
    res.status(201).json(project);
});

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
router.patch('/:id', (req, res) => {
    const{id} = req.params;
    const index = projects.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    projects[index] = { ...projects[index], ...req.body, id: projects[index].id };
    res.json(projects[index]);
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