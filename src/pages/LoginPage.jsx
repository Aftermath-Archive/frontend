import Login from '@/components/Auth/Login/Login';
import Layout from '@/components/Layout/Layout';

export default function LoginPage() {
    return (
        <Layout>
            <div className="mx-auto max-w-lg pt-16">
                <Login />
            </div>
        </Layout>
    );
}
