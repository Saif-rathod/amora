// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { auth } from '@/lib/auth'

// export async function GET() {
//   try {
//     const session = await auth()
//     if (!session?.user) {
//       return new NextResponse('Unauthorized', { status: 401 })
//     }

//     const lovedOnes = await prisma.lovedOne.findMany({
//       where: {
//         userId: session.user.id
//       },
//     //   include: {
//         occasions: true,
//         contactInfo: true,
//         notifications: true
//       }
//     })

//     return NextResponse.json(lovedOnes)
//   } catch (error) {
//     console.error('GET /api/loved-ones error:', error)
//     return new NextResponse('Internal Error', { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const session = await auth()
//     if (!session?.user) {
//       return new NextResponse('Unauthorized', { status: 401 })
//     }

//     const body = await req.json()
//     const {
//       name,
//       relationship,
//       birthday,
//       occasions,
//       contactInfo,
//       notifications,
//       notes,
//       reminderDays
//     } = body

//     const lovedOne = await prisma.lovedOne.create({
//       data: {
//         userId: session.user.id,
//         name,
//         relationship,
//         birthday: new Date(birthday),
//         notes,
//         occasions: {
//           create: occasions.map((occ: any) => ({
//             type: occ.type,
//             date: new Date(occ.date),
//             description: occ.description,
//             isRecurring: occ.isRecurring
//           }))
//         },
//         contactInfo: {
//           create: contactInfo
//         },
//         notifications: {
//           create: {
//             ...notifications,
//             reminderDays
//           }
//         }
//       },
//       include: {
//         occasions: true,
//         contactInfo: true,
//         notifications: true
//       }
//     })

//     return NextResponse.json(lovedOne)
//   } catch (error) {
//     console.error('POST /api/loved-ones error:', error)
//     return new NextResponse('Internal Error', { status: 500 })
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     const session = await auth()
//     if (!session?.user) {
//       return new NextResponse('Unauthorized', { status: 401 })
//     }

//     const body = await req.json()
//     const {
//       id,
//       name,
//       relationship,
//       birthday,
//       occasions,
//       contactInfo,
//       notifications,
//       notes,
//       reminderDays
//     } = body

//     // First delete existing related records
//     await prisma.$transaction([
//       prisma.occasion.deleteMany({
//         where: { lovedOneId: id }
//       }),
//       prisma.contactInfo.delete({
//         where: { lovedOneId: id }
//       }),
//       prisma.notificationPreference.delete({
//         where: { lovedOneId: id }
//       })
//     ])

//     // Then update with new data
//     const updatedLovedOne = await prisma.lovedOne.update({
//       where: { id },
//       data: {
//         name,
//         relationship,
//         birthday: new Date(birthday),
//         notes,
//         occasions: {
//           create: occasions.map((occ: any) => ({
//             type: occ.type,
//             date: new Date(occ.date),
//             description: occ.description,
//             isRecurring: occ.isRecurring
//           }))
//         },
//         contactInfo: {
//           create: contactInfo
//         },
//         notifications: {
//           create: {
//             ...notifications,
//             reminderDays
//           }
//         }
//       },
//       include: {
//         occasions: true,
//         contactInfo: true,
//         notifications: true
//       }
//     })

//     return NextResponse.json(updatedLovedOne)
//   } catch (error) {
//     console.error('PUT /api/loved-ones error:', error)
//     return new NextResponse('Internal Error', { status: 500 })
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const session = await auth()
//     if (!session?.user) {
//       return new NextResponse('Unauthorized', { status: 401 })
//     }

//     const { searchParams } = new URL(req.url)
//     const id = searchParams.get('id')

//     if (!id) {
//       return new NextResponse('Missing ID', { status: 400 })
//     }

//     await prisma.lovedOne.delete({
//       where: { id }
//     })

//     return new NextResponse('Deleted', { status: 200 })
//   } catch (error) {
//     console.error('DELETE /api/loved-ones error:', error)
//     return new NextResponse('Internal Error', { status: 500 })
//   }
// } 