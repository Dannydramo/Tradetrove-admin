import Chart from './components/HomeComponent/Chart';
import LatestOrders from './components/HomeComponent/LatestOrders';
import Statistics from './components/HomeComponent/Statistics';
import Layout from './components/Layout';

const HomePage = () => {
    return (
        <>
            <Layout>
                <section className="lg:col-span-1 mt-6 px-6">
                    <Statistics />
                    <Chart />
                    <LatestOrders />
                </section>
            </Layout>
        </>
    );
};

export default HomePage;
