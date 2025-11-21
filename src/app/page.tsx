'use client'

import { useState } from 'react'
import { Users, Plus, Mail, Phone, Calendar, Star, TrendingUp } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  score: number
  stage: 'new' | 'contacted' | 'qualified' | 'negotiating' | 'closed'
  value: number
  lastContact: string
  notes: string
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@email.com',
    phone: '(555) 123-4567',
    source: 'Website',
    score: 85,
    stage: 'qualified',
    value: 450000,
    lastContact: '2 hours ago',
    notes: 'Looking for 3BR in Fort Myers'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '(555) 987-6543',
    source: 'Referral',
    score: 92,
    stage: 'negotiating',
    value: 325000,
    lastContact: '1 day ago',
    notes: 'First-time buyer, pre-approved'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike@email.com',
    phone: '(555) 456-7890',
    source: 'Open House',
    score: 65,
    stage: 'contacted',
    value: 280000,
    lastContact: '3 days ago',
    notes: 'Interested in condos'
  },
]

const stages = [
  { id: 'new', label: 'New Leads', color: 'bg-gray-100' },
  { id: 'contacted', label: 'Contacted', color: 'bg-blue-100' },
  { id: 'qualified', label: 'Qualified', color: 'bg-yellow-100' },
  { id: 'negotiating', label: 'Negotiating', color: 'bg-orange-100' },
  { id: 'closed', label: 'Closed', color: 'bg-green-100' },
]

export default function LeadTracking() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [showAddModal, setShowAddModal] = useState(false)

  const getLeadsByStage = (stage: string) => leads.filter(l => l.stage === stage)

  const stats = {
    total: leads.length,
    qualified: leads.filter(l => l.stage === 'qualified' || l.stage === 'negotiating').length,
    totalValue: leads.reduce((sum, l) => sum + l.value, 0),
    avgScore: Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lead Tracking & CRM</h1>
                <p className="text-sm text-gray-500">Manage your sales pipeline</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Lead
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-1">Active Pipeline</p>
            <p className="text-3xl font-bold text-blue-600">{stats.qualified}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-1">Pipeline Value</p>
            <p className="text-3xl font-bold text-green-600">${(stats.totalValue / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-1">Avg Lead Score</p>
            <p className="text-3xl font-bold text-orange-600">{stats.avgScore}</p>
          </div>
        </div>

        {/* Pipeline Kanban */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageLeads = getLeadsByStage(stage.id)
            return (
              <div key={stage.id} className="flex-shrink-0 w-80">
                <div className={`${stage.color} rounded-t-lg px-4 py-3`}>
                  <h3 className="font-semibold text-gray-900">
                    {stage.label}
                    <span className="ml-2 text-sm text-gray-600">({stageLeads.length})</span>
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-b-lg p-4 min-h-[400px] space-y-3">
                  {stageLeads.map(lead => (
                    <div key={lead.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                      {/* Lead Card */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                          <p className="text-sm text-gray-600">{lead.source}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{lead.score}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-green-600">
                          ${lead.value.toLocaleString()}
                        </span>
                        <span className="text-gray-500">{lead.lastContact}</span>
                      </div>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{lead.notes}</p>

                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors">
                          Contact
                        </button>
                        <button className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No leads in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors">
              <Calendar className="w-6 h-6 mb-2" />
              <p className="font-semibold">Schedule Follow-ups</p>
              <p className="text-sm text-white/80 mt-1">Set reminders for leads</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors">
              <Mail className="w-6 h-6 mb-2" />
              <p className="font-semibold">Send Email Campaign</p>
              <p className="text-sm text-white/80 mt-1">Bulk email to leads</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors">
              <TrendingUp className="w-6 h-6 mb-2" />
              <p className="font-semibold">View Analytics</p>
              <p className="text-sm text-white/80 mt-1">Conversion metrics</p>
            </button>
          </div>
        </div>
      </main>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
            <p className="text-gray-600 mb-4">Lead capture form will be implemented here</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
