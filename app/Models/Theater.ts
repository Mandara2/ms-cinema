import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector'
import Seat from './Seat'
import Screening from './Screening'

export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location:string

  @column()
  public capacity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Projector, {
    //Este es el nombre de la clave foraneas 
    foreignKey: 'theater_id'
  })
  public projector: HasOne<typeof Projector>

  @hasMany(() => Seat, { //Este es el N
    //Este es el nombre de la clave foraneas 
    foreignKey: 'theater_id'
  })
  public seats: HasMany<typeof Seat>

  @hasMany(() => Screening, { //Este es el N
    //Este es el nombre de la clave foranea, de la clase screening
    foreignKey: 'theater_id'
  })
  public screenings: HasMany<typeof Screening>
}
