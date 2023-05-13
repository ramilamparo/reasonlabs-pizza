import { Pizza } from 'src/modules/pizza/pizza.entity';
import { DoughChefStation } from './DoughChefStation';
import { OvenStation } from './OvenStation';
import { Station } from './Station';
import { ToppingChefStation } from './ToppingChefStation';
import { WaiterStation } from './WaiterStation';
import { Order } from 'src/modules/order/order.entity';

export class RestaurantSingleton {
  public static instance: RestaurantSingleton;

  public readonly doughChefStation = new DoughChefStation();
  public readonly toppingChefStation = new ToppingChefStation();
  public readonly ovenStation = new OvenStation();
  public readonly waiterStation = new WaiterStation();
  private stations: Station[] = [
    this.doughChefStation,
    this.toppingChefStation,
    this.ovenStation,
    this.waiterStation,
  ];

  private constructor() {
    this.stations.forEach((station, i, stations) => {
      const nextStation = stations[i + 1];
      if (nextStation) {
        station.completed.on('enqueue', (pizza) => {
          nextStation.pending.enqueue(pizza);
        });
      }
    });
  }

  public getInstance() {
    if (RestaurantSingleton.instance) {
      return RestaurantSingleton.instance;
    }
    const instance = new RestaurantSingleton();
    RestaurantSingleton.instance = instance;
    return instance;
  }

  public processOrder(order: Order) {
    this.doughChefStation.pending.enqueue(order);
  }
}
