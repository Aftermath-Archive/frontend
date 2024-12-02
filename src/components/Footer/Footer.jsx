/**
 * A function that returns a footer element containing copyright information with the current year and a link to the creator's GitHub profile.
 * @author Xander
 *
 * @export
 * @returns {*} A functional component representing the footer of a web page with copyright information and link to the creator's GitHub profile.
 */
export default function Footer() {
    return (
        <footer className="p-20 text-center">
            <p>
                Copyright © {new Date().getFullYear()} - Made with ❤️ by{' '}
                <a href="https://github.com/xdaybreakerx">Xander</a>.
            </p>
        </footer>
    );
}
