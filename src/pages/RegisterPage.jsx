import Register from '@/components/Auth/Register/Register';
import Layout from '@/components/Layout/Layout';

export default function RegisterPage() {
    return (
        <Layout>
            <div className="mx-auto max-w-lg pt-16">
                <Register />
            </div>
        </Layout>
    );
}
