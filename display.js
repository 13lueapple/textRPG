export class Display {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.container = document.getElementById("container");
    }

    draw() {
        for(let i = 0; i < this.height; i++){
            const columnTiles = document.createElement("div")
            columnTiles.id = i
            for(let j = 0; i < this.width; j++){
                const tile = document.createElement("div");
                tile.id = j;
                tile.textContent = "0";
                this.container.add
                columnTiles.appendChild(tile)
            }
            this.container.appendChild(columnTiles)
        }
    }
}