class Board {
    constructor(x, y, width, height, outlineColor, layerOffset, horVel=0.02, verVel=1, clone=false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.outlineColor = outlineColor;
        this.widthOffset = 20;
        this.heightOffset = 10;
        this.horVel = horVel;
        this.verVel = verVel;
        this.angle = 0;
        this.layerOffset = layerOffset;
        this.clone = clone;

        this.x0 = x - width + this.widthOffset;
        this.y0 = y - this.heightOffset + layerOffset;
        this.x1 = x + width - this.widthOffset;
        this.y1 = y - this.heightOffset + layerOffset;

        this.x2 = x - width - this.heightOffset;
        this.y2 = y + this.heightOffset + layerOffset;
        this.x3 = x - width + this.heightOffset;
        this.y3 = y + this.heightOffset + layerOffset;

        this._PI = Math.PI;
        this._halfPI = this._PI / 2;
    }

    verticalRotate(key) {
        if (key === 'up' && this.height >= 0) {
            this.height -= this.verVel;
        } else if (key === 'down' && this.height <= this.width) {
            this.height += this.verVel;
        }
    }

    horizontalRotate(key) {
        if (key == 'left') {
            this.angle += this.horVel;
        } else if (key == 'right') {
            this.angle -= this.horVel;
        }

        if (this.angle > 2 * this._PI) {
            this.angle = 0;
        }
    }

    motionPersist() {
        this.x0 = this.x + this.width * Math.cos(this.angle);
        this.y0 = this.y + this.height * Math.sin(this.angle);

        this.x1 = this.x + this.width * Math.cos(this.angle + this._halfPI);
        this.y1 = this.y + this.height * Math.sin(this.angle + this._halfPI);

        this.x2 = this.x + this.width * Math.cos(this.angle + this._PI);
        this.y2 = this.y + this.height * Math.sin(this.angle + this._PI);

        this.x3 = this.x + this.width * Math.cos(this.angle - this._halfPI);
        this.y3 = this.y + this.height * Math.sin(this.angle - this._halfPI);
    }

    motionPersistClone(vertexes) {
        const { x0, y0, x1, y1, x2, y2, x3, y3 } = vertexes;
        
        this.x0 = x0;
        this.y0 = y0 + this.layerOffset;

        this.x1 = x1;
        this.y1 = y1 + this.layerOffset;

        this.x2 = x2;
        this.y2 = y2 + this.layerOffset;

        this.x3 = x3;
        this.y3 = y3 + this.layerOffset;
    }

    getVertexes() {
        return {
            x0: this.x0, y0: this.y0,
            x1: this.x1, y1: this.y1,
            x2: this.x2, y2: this.y2,
            x3: this.x3, y3: this.y3
        };
    }

    // drawLine(ctx) {
    //     ctx.beginPath();
    // }

    renderCenter(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, 2 * this._PI);
        ctx.stroke();
    }

    render(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.outlineColor;
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.lineTo(this.x0, this.y0);
        ctx.stroke();
    }

    run(ctx, key) {
        this.verticalRotate(key);
        this.horizontalRotate(key);
        this.renderCenter(ctx);
        this.render(ctx);
    }
}