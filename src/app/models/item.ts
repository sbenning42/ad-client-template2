export class Item {
    constructor(
        public id: number,
        public name: string,
        public quantity: number,
        public price: number,
        public price_by: string,
        public description: string,
        public size_height: number,
        public size_width: number,
        public size_depth: number,
        public designer: string,
        public brand: string,
        public category: string,
        public condition: string,
        public style: string,
        public periods: string,
        public material: string,
        public color: string,
        public address: any,
        public pictures: any,
        public infos: any
    ) { }
}
