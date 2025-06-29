import React, { useState } from 'react'
import { Shield, AlertTriangle, Activity, Lock, Eye, Download, Filter } from 'lucide-react'
import { useSecurityContext } from './SecurityProvider'
import { useAuthContext } from '../contexts/AuthContext'

export function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const { securityAlerts } = useSecurityContext()
  const { user } = useAuthContext()

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: Shield },
    { id: 'alerts', label: 'Security Alerts', icon: AlertTriangle },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Security Settings', icon: Lock },
  ]

  const severityColors = {
    low: 'bg-success-100 text-success-800',
    medium: 'bg-warning-100 text-warning-800',
    high: 'bg-error-100 text-error-800',
    critical: 'bg-red-100 text-red-800',
  }

  const filteredAlerts = securityAlerts.filter(alert => 
    filterSeverity === 'all' || alert.severity === filterSeverity
  )

  const securityMetrics = {
    totalAlerts: securityAlerts.length,
    criticalAlerts: securityAlerts.filter(a => a.severity === 'critical').length,
    highAlerts: securityAlerts.filter(a => a.severity === 'high').length,
    lastIncident: securityAlerts.length > 0 ? securityAlerts[0] : null,
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Security Center</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">
                Status: {securityMetrics.criticalAlerts === 0 ? 'Secure' : 'Alert'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Total Alerts</p>
                    <p className="text-2xl font-bold text-neutral-900">{securityMetrics.totalAlerts}</p>
                  </div>
                  <Activity className="h-8 w-8 text-neutral-400" />
                </div>
              </div>
              <div className="bg-error-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-error-600">Critical Alerts</p>
                    <p className="text-2xl font-bold text-error-900">{securityMetrics.criticalAlerts}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-error-400" />
                </div>
              </div>
              <div className="bg-warning-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warning-600">High Priority</p>
                    <p className="text-2xl font-bold text-warning-900">{securityMetrics.highAlerts}</p>
                  </div>
                  <Shield className="h-8 w-8 text-warning-400" />
                </div>
              </div>
              <div className="bg-success-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-success-600">Security Score</p>
                    <p className="text-2xl font-bold text-success-900">
                      {Math.max(0, 100 - (securityMetrics.criticalAlerts * 20) - (securityMetrics.highAlerts * 10))}%
                    </p>
                  </div>
                  <Lock className="h-8 w-8 text-success-400" />
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-neutral-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Security Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Two-Factor Authentication</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-sm">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Session Security</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-sm">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Payment Security</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-sm">PCI Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Data Encryption</span>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-sm">AES-256</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-neutral-600" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[alert.severity]}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-neutral-600">{alert.type}</span>
                        </div>
                        <p className="text-neutral-900 font-medium mb-1">{alert.type.replace(/_/g, ' ').toUpperCase()}</p>
                        <p className="text-sm text-neutral-600">
                          {JSON.stringify(alert.details, null, 2)}
                        </p>
                      </div>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600">No security alerts found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
              <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                <Download className="h-4 w-4" />
                <span>Export Log</span>
              </button>
            </div>

            <div className="space-y-3">
              {securityAlerts.slice(0, 10).map((alert, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500' :
                    alert.severity === 'high' ? 'bg-error-500' :
                    alert.severity === 'medium' ? 'bg-warning-500' : 'bg-success-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{alert.type.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-neutral-600">
                      {new Date().toLocaleString()} • {alert.severity} severity
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Security Settings</h3>
            
            <div className="space-y-6">
              <div className="border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Authentication</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Two-Factor Authentication</span>
                    <button className="bg-success-600 text-white px-3 py-1 rounded text-sm">Enabled</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Session Timeout</span>
                    <span className="text-neutral-600">30 minutes</span>
                  </div>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Security Alerts</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Login Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Payment Alerts</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Data Protection</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Data Encryption</span>
                    <span className="px-2 py-1 bg-success-100 text-success-800 rounded text-sm">AES-256</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700">Backup Encryption</span>
                    <span className="px-2 py-1 bg-success-100 text-success-800 rounded text-sm">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}