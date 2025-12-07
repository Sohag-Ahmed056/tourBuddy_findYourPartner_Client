import Navbar from "@/components/home/Navbar";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
        <Navbar />
            
            {children}
            
        </>
    );
};

export default CommonLayout;