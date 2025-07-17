import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AddBook from '../components/AddBook';

const AddBookPage = () => (
    <DashboardLayout>
        <h1 className="mb-4">Add New Book</h1>
        <AddBook />
    </DashboardLayout>
);

export default AddBookPage;
