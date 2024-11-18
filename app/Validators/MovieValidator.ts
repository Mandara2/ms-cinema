import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    name:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    duration:schema.number([rules.range(1,500)]),
    date: schema.date({
      format: 'yyyy-MM-dd',
    })
  })
  public messages: CustomMessages = {}
}
