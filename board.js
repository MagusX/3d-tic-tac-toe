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

        this.radiusCos0; this.radiusSin0;
        this.radiusCos1; this.radiusSin1;

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
        this.radiusCos0 = this.width * Math.cos(this.angle);
        this.radiusSin0 = this.height * Math.sin(this.angle);
        this.radiusCos1 = this.width * Math.cos(this.angle + this._halfPI);
        this.radiusSin1 = this.height * Math.sin(this.angle + this._halfPI);

        this.x0 = this.x + this.radiusCos0;
        this.y0 = this.y + this.radiusSin0;

        this.x1 = this.x + this.radiusCos1;
        this.y1 = this.y + this.radiusSin1;

        this.x2 = this.x - this.radiusCos0;
        this.y2 = this.y - this.radiusSin0;

        this.x3 = this.x - this.radiusCos1;
        this.y3 = this.y - this.radiusSin1;
    }

    attach(grids) {
        let { grid0, grid1, grid2, grid3, grid4, grid5, grid6, grid7 } = grids;
        // diagonals
        grid0.x = this.x + this.radiusCos0 * 2;
        grid0.y = this.y + this.radiusSin0 * 2;

        grid1.x = this.x + this.radiusCos1 * 2;
        grid1.y = this.y + this.radiusSin1 * 2;

        grid2.x = this.x - this.radiusCos0 * 2;
        grid2.y = this.y - this.radiusSin0 * 2;

        grid3.x = this.x - this.radiusCos1 * 2;
        grid3.y = this.y - this.radiusSin1 * 2;

        // straight
        const radiusCos2 = this.width * Math.cos(this._PI / 4) * Math.cos(this.angle + this._PI / 4);
        const radiusSin2 = this.height * Math.cos(this._PI / 4) * Math.sin(this.angle + this._PI / 4);

        const radiusCos3 = this.width * Math.cos(this._PI / 4) * Math.cos(this.angle - this._PI / 4);
        const radiusSin3 = this.height * Math.cos(this._PI / 4) * Math.sin(this.angle - this._PI / 4);

        grid4.x = this.x + radiusCos2 * 2;
        grid4.y = this.y + radiusSin2 * 2;

        grid5.x = this.x + radiusCos3 * 2;
        grid5.y = this.y + radiusSin3 * 2;

        grid6.x = this.x - radiusCos2 * 2;
        grid6.y = this.y - radiusSin2 * 2;

        grid7.x = this.x - radiusCos3 * 2;
        grid7.y = this.y - radiusSin3 * 2;
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