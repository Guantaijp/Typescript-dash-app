import React from "react";
import AppRoutes from "./Approutes";
import NavHeader from "./NavHeader";

const PageContent = () => {
    return (
        <>
            <NavHeader />
            <div className="PageContent m-12">
                <AppRoutes />
            </div>
        </>
    );
};

export default PageContent;
