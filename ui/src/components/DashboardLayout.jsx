import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
    <>
        <Navbar />
        <div className="container-fluid">
        <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <Sidebar />
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            <Outlet />
            </main>
        </div>
        </div>
    </>
);

export default DashboardLayout;
