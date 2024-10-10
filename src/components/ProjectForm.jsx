// src/components/ProjectForm.js
import React, { useState, useEffect } from 'react';

const ProjectForm = ({ project, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        demoUrl: '',
        techStacks: [],
    });

    useEffect(() => {
        if (project) {
            setFormData(project);
        } else {
            setFormData({ title: '', image: '', demoUrl: '', techStacks: [] });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
            />
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />
            <input
                type="text"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="Demo URL"
                required
            />
            <button type="submit">{project ? 'Update' : 'Add'} Project</button>
        </form>
    );
};

export default ProjectForm;
