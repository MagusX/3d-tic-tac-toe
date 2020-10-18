class Grid {
    constructor(id, x, y, width, height, outlineColor, layerOffset, horVel=0.02, verVel=1, clone=false) {
        this.id = id;
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
        this._deg90 = this._PI / 2;
        this._deg45 = this._deg90 / 2;

        this.selected = false;
        this.player = '';
        this.opac = 1 - Math.floor(id / 9) / 5;
    }

    verticalRotate(key) {
        if (key === 'up' && this.height >= 0) {
            this.height -= this.verVel;
        } else if (key === 'down' && this.height <= this.width) {
            this.height += this.verVel;
        }
        if (this.height < 0) {
            this.height = 0;
        }
    }

    horizontalRotate(key) {
        if (key == 'left') {
            this.angle += this.horVel;
        } else if (key == 'right') {
            this.angle -= this.horVel;
        }

        const fullCircle = this._PI + this._PI;
        if (this.angle > fullCircle || this.angle < -fullCircle) {
            this.angle = 0;
        }
    }

    motionPersist() {
        this.radiusCos0 = this.width * Math.cos(this.angle);
        this.radiusSin0 = this.height * Math.sin(this.angle);
        this.radiusCos1 = this.width * Math.cos(this.angle + this._deg90);
        this.radiusSin1 = this.height * Math.sin(this.angle + this._deg90);

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
        let { grid0, grid1, grid2, grid3, grid5, grid6, grid7, grid8 } = grids;
        // diagonals
        grid0.x = this.x + this.radiusCos0 * 2;
        grid0.y = this.y + this.radiusSin0 * 2;

        grid2.x = this.x + this.radiusCos1 * 2;
        grid2.y = this.y + this.radiusSin1 * 2;

        grid8.x = this.x - this.radiusCos0 * 2;
        grid8.y = this.y - this.radiusSin0 * 2;

        grid6.x = this.x - this.radiusCos1 * 2;
        grid6.y = this.y - this.radiusSin1 * 2;

        // straight
        const straightRadius = Math.cos(this._deg45);
        const strtRP = straightRadius * Math.cos(this.angle + this._deg45);
        const strtRM = straightRadius * Math.cos(this.angle - this._deg45);

        // cos(x-45) = sin(x+45)
        // cos(x+45) = -sin(x-45)
        const radiusCos2 = this.width * strtRP;
        const radiusSin2 = this.height * strtRM;
        const radiusCos3 = this.width * strtRM;
        const radiusSin3 = this.height * -strtRP;

        grid1.x = this.x + radiusCos2 * 2;
        grid1.y = this.y + radiusSin2 * 2;

        grid3.x = this.x + radiusCos3 * 2;
        grid3.y = this.y + radiusSin3 * 2;

        grid7.x = this.x - radiusCos2 * 2;
        grid7.y = this.y - radiusSin2 * 2;

        grid5.x = this.x - radiusCos3 * 2;
        grid5.y = this.y - radiusSin3 * 2;
    }

    motionPersistClone(vertexes) {
        const { x, y, x0, y0, x1, y1, x2, y2, x3, y3 } = vertexes;
        
        this.x = x;
        this.y = y + this.layerOffset;
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
            x: this.x, y: this.y,
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

    renderId(ctx) {
        ctx.font = '15px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(this.player, this.x, this.y);
    }

    renderMark(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.markColor;
        ctx.arc(this.x, this.y, this.height / Math.sqrt(2), 0, 2 * this._PI);
        ctx.fill();
    }

    renderHover(ctx, playerA) {
        if (this.selected) return;
        this.markColor = playerA ? `rgba(231, 76, 60, ${this.opac})` : `rgba(52, 152, 219, ${this.opac})`;
        this.outlineColor = '#32ff7e';
        this.renderMark(ctx, playerA);
    }

    run(ctx, key, playerA) {
        this.verticalRotate(key);
        this.horizontalRotate(key);
        // this.renderCenter(ctx);
        // this.renderId(ctx);
        this.render(ctx);
        this.outlineColor = 'rgb(255, 255, 255)';
        if (this.selected) {
            this.renderMark(ctx);
        }
    }
}