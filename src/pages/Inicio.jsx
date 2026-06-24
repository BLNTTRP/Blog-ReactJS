const Inicio = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Bienvenido a mi Blog React</h1>
            <p>Este es el inicio de mi Single Page Application.</p>

            {/* Agregamos el logo de React aquí */}
            <img
                src="/React-icon.svg"
                alt="Logo de React"
                style={{
                    width: '150px',
                    marginTop: '30px'
                }}
            />
        </div>
    );
};

export default Inicio;