import { EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { format } from "date-fns";

@EventSubscriber()
export class DateSubscriber implements EntitySubscriberInterface {

  afterLoad(entry: any) {
    for (let key in entry) {
      if (key.endsWith('Time')) {
        entry[`${key}Str`] = entry[key] ? format(entry[key], 'yyyy-MM-dd HH:mm:ss') : ''
      }
    }
  }
}
