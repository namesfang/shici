import { json } from "@sveltejs/kit";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {

  
async function main() {
  const user = await prisma.author.create({
    data: {
      fullname: '',
      birthdate: '',
      dynasty: '',
      birthplace: '',
      profiles: '',
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
  return json({
    mess: '炽'
  })
}