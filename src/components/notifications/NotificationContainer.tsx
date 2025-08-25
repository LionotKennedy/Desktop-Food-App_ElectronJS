"use client"

import type React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { cn } from "../../lib/utils"
import type { Notification } from "../../hooks/useNotifications"

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colorMap = {
  success: "border-green-500 bg-green-50 text-green-800",
  error: "border-red-500 bg-red-50 text-red-800",
  info: "border-blue-500 bg-blue-50 text-blue-800",
  warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type]
        return (
          <Card
            key={notification.id}
            className={cn(
              "border-l-4 shadow-lg animate-in slide-in-from-right duration-300",
              colorMap[notification.type],
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(notification.id)}
                  className="h-6 w-6 p-0 hover:bg-black/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
