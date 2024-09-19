import Navbar from './Navbar/Navbar';
import './styles/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
