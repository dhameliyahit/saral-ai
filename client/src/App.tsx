import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import EmailCampaignsPage from './pages/EmailCampaignsPage'
import CampaignBuilderPage from './pages/CampaignBuilderPage'
import FeaturesPage from './pages/FeaturesPage'
import CustomersPage from './pages/CustomersPage'
import PricingPage from './pages/PricingPage'

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/search" element={
              <Layout title="AI Candidate Search - SARAL AI" description="Find perfect candidates with AI-powered search">
                <SearchPage />
              </Layout>
            } />
            <Route path="/email-campaigns" element={
              <Layout title="Email Campaigns - SARAL AI" description="Create and manage email campaigns for recruitment">
                <EmailCampaignsPage />
              </Layout>
            } />
            <Route path="/campaign-builder" element={
              <Layout title="Create Campaign - SARAL AI" description="Build and launch your candidate outreach campaigns">
                <CampaignBuilderPage />
              </Layout>
            } />
            <Route path="/features" element={
              <Layout title="Features - SARAL AI" description="Discover all features of our AI recruitment platform">
                <FeaturesPage />
              </Layout>
            } />
            <Route path="/customers" element={
              <Layout title="Customers - SARAL AI" description="See how companies use SARAL AI for hiring">
                <CustomersPage />
              </Layout>
            } />
            <Route path="/pricing" element={
              <Layout title="Pricing - SARAL AI" description="Choose the right plan for your hiring needs">
                <PricingPage />
              </Layout>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App