const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'
}));

const BASE_DIR = process.cwd(); // The current directory where the server is running
const PROJECTS_DIR = path.join(BASE_DIR, 'projects'); // All projects will reside here

// Ensure the base projects directory exists
if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR);
}

// Utility function to get folder structure as JSON
const getFolderStructure = (dir) => {
    const result = {};
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach((item) => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            result[item.name] = getFolderStructure(fullPath);
        } else {
            result[item.name] = 'file';
        }
    });
    return result;
};

// API to create a project
app.post('/api/createProject', (req, res) => {
    const { projectName } = req.body;

    if (!projectName) {
        return res.status(400).json({ error: 'Project name is required' });
    }

    const sanitizedProjectName = projectName.replace(/\s+/g, '_');
    const projectPath = path.join(PROJECTS_DIR, sanitizedProjectName);
    const srcPath = path.join(projectPath, 'src');
    const comPath = path.join(srcPath, 'com');
    const mainFilePath = path.join(comPath, 'Main.java');

    // Create folder structure
    try {
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
            fs.mkdirSync(srcPath);
            fs.mkdirSync(comPath);

            // Create Main.java
            fs.writeFileSync(mainFilePath, `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`);

            // Get and return the folder structure
            const folderStructure = getFolderStructure(projectPath);
            return res.status(200).json({ message: 'Project created successfully', structure: folderStructure });
        } else {
            return res.status(200).json({ error: 'Project already exists' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create project', details: error.message });
    }
});

// API to get the folder structure of a specific project
app.get('/api/getProject/:projectName', (req, res) => {
    const projectName = req.params.projectName.replace(/\s+/g, '_');
    const projectPath = path.join(PROJECTS_DIR, projectName);

    if (!fs.existsSync(projectPath)) {
        return res.status(404).json({ error: 'Project does not exist' });
    }

    try {
        const folderStructure = getFolderStructure(projectPath);
        return res.status(200).json({ project: projectName, structure: folderStructure });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve project structure', details: error.message });
    }
});

// API to list all project names
app.get('/api/listProjects', (req, res) => {
    try {
        const projectNames = fs.readdirSync(PROJECTS_DIR).filter((name) => {
            const projectPath = path.join(PROJECTS_DIR, name);
            return fs.lstatSync(projectPath).isDirectory();
        });
        return res.status(200).json({ projects: projectNames });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to list projects', details: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
