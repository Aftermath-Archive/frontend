import Layout from '@/components/Layout/Layout';

/**
 * A function that renders the ErrorPage component. The component displays an error message with a heading and a paragraph informing the user that the page they are looking for does not exist. It also provides guidance to check the URL or return to the homepage.
 * @author Xander
 *
 * @export
 * @returns {*} A function that returns an error page component with a message stating that an error has been encountered. It includes a layout with a heading and a paragraph explaining that the page the user is looking for does not exist.
 */
export default function ErrorPage() {
    return (
        <Layout>
            <h1 className="text-4xl uppercase font-bold p-8 text-left">
                We&apos;ve encountered an error...
            </h1>
            <p className="text-lg text-left px-8">
                The page you are looking for doesn&apos;t exist. Please check
                the URL or return to the homepage.
            </p>
        </Layout>
    );
}
