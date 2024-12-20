import React from 'react';
import "../home.css";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Witamy na naszej aplikacji!</h1>
            <p className="home-description">
                Cieszymy się, że jesteś z nami. Nasza aplikacja oferuje wiele przydatnych funkcji, które pomogą Ci w codziennych zadaniach.
            </p>
            <span className="purple-text">Zarejestruj się lub zaloguj, aby zacząć korzystać z wszystkich możliwości!</span>
        </div>
    );
};

export default Home;