import { client } from "$lib/prisma";
import { redirect } from "@sveltejs/kit";


export async function load() {
  const info = await client.configuration.findFirst({
    where: {
      key: 'adm_wechat_contact'
    }
  })

  if(info) {
    const parsed = JSON.parse(info.value)
    if(parsed.data.id && parsed.data.qrl) {
      return parsed.data
    }
  }
  return redirect(302, '/website-administrator/tips')
}