function Footer() {
    return (
        <footer className='page-footer indigo lighten-2'>
            <div className='footer-copyright'>
                <div className='container'>
                    © {new Date().getFullYear()} Copyright text
                    <a
                        className='grey-text text-lighten-4 right'
                        href='https://github.com/WaRaGiSmYnIcKnAmE/react-movies'
                    >
                        Repo
                    </a>
                </div>
            </div>
        </footer>
    );
}

export { Footer };
