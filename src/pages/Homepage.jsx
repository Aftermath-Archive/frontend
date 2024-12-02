import Layout from '@/components/Layout/Layout';

export default function HomePage() {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* App Name and Description */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold">Aftermath Archive</h1>
                    <h2 className="text-xl">Incident Management</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni impedit in accusantium tempore officiis. Modi,
                        ipsam natus voluptas eum magnam iusto dolorum ea sit
                        architecto dicta aperiam officia ad beatae?
                    </p>
                </header>
            </div>
        </Layout>
    );
}
