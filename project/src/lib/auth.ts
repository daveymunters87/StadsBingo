import { cookies } from 'next/headers'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTeamFromSession() {
  const cookieStore = await cookies()
  const teamSession = cookieStore.get('team-session')
  
  if (!teamSession) {
    return null
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamSession.value },
      include: { 
        captain: true, 
        players: true 
      },
    })
    
    return team
  } catch (error) {
    console.error('Error fetching team from session:', error)
    return null
  }
}

export async function getAdminFromSession() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin-session')
  
  if (!adminSession) {
    return null
  }

  try {
    const admin = await prisma.user.findFirst({
      where: {
        id: adminSession.value,
        role: Role.ADMIN
      }
    })
    
    return admin
  } catch (error) {
    console.error('Error fetching admin from session:', error)
    return null
  }
}

export function getTeamIdFromHeaders(request: Request): string | null {
  // First try to get from headers (set by middleware)
  const headerTeamId = request.headers.get('x-team-id')
  
  if (headerTeamId) {
    return headerTeamId
  }
  
  // Fallback: try to get from cookies directly
  const cookieHeader = request.headers.get('cookie')
  
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    return cookies['team-session'] || null
  }
  
  return null
}

export function getAdminIdFromHeaders(request: Request): string | null {
  // First try to get from headers (set by middleware)
  const headerAdminId = request.headers.get('x-admin-id')
  
  if (headerAdminId) {
    return headerAdminId
  }
  
  // Fallback: try to get from cookies directly
  const cookieHeader = request.headers.get('cookie')
  
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    return cookies['admin-session'] || null
  }
  
  return null
}