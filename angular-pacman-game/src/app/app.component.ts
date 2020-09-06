import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DOWN_ARROW = 40,
  UP_ARROW = 38,
}

class Ghost {
  className: string;
  classNamecopy: string;
  startIndex: number;
  speed: number;
  currentIndex: number;
  nextIndex: number;
  isScared: boolean;
  timerId: number;

  constructor(className, startIndex, speed) {
    this.className = className;
    this.classNamecopy = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.nextIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-pacman';
  width: number = 28;
  scoreValue = 0;
  //Shermaine and Saw

  //Layout on Screen

  // layout
  // legend
  // 0 - pac dot
  // 1 wall
  // 2 - ghost lair
  // 3 - power pellet
  // 4 - empty
  layout = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    4,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    4,
    0,
    0,
    0,
    4,
    4,
    4,
    4,
    4,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    3,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    3,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ];

  //How many ghosts
  squares = [];
  pacmanCurrentIndex = 490;
  ghosts = [
    new Ghost('blinky', 348, 300),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 320),
    new Ghost('clyde', 379, 500),
  ];

  @ViewChild('grid') grid: ElementRef;
  @ViewChild('score') score: ElementRef;
  @ViewChild('result') result: ElementRef;

  @HostListener('document:keyup', ['$event'])
  KeyUpEvent(event: KeyboardEvent) {
    this.ghosts.forEach((ghost) => {
      //this.squares[ghost.currentIndex].classList.add('ghost');
      //this.squares[ghost.currentIndex].classList.add(ghost.className);
      this.moveGhost(ghost);
      this.moveGhost(ghost);
    });
    this.renderer.removeClass(this.squares[this.pacmanCurrentIndex], 'pac-man');
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if (
        this.pacmanCurrentIndex - this.width >= 0 &&
        !this.squares[this.pacmanCurrentIndex + 1].classList.contains('wall') &&
        !this.squares[this.pacmanCurrentIndex + 1].classList.contains(
          'ghost-lair'
        )
      )
        this.pacmanCurrentIndex += 1;
      if (this.squares[this.pacmanCurrentIndex + 1] === this.squares[392]) {
        this.pacmanCurrentIndex = 364;
      }
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if (
        this.pacmanCurrentIndex % this.width !== 0 &&
        !this.squares[this.pacmanCurrentIndex - 1].classList.contains('wall') &&
        !this.squares[this.pacmanCurrentIndex - 1].classList.contains(
          'ghost-lair'
        )
      )
        this.pacmanCurrentIndex -= 1;
      if (this.squares[this.pacmanCurrentIndex - 1] === this.squares[363]) {
        this.pacmanCurrentIndex = 391;
      }
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      if (
        this.pacmanCurrentIndex + this.width < this.width * this.width &&
        !this.squares[this.pacmanCurrentIndex + this.width].classList.contains(
          'wall'
        ) &&
        !this.squares[this.pacmanCurrentIndex + this.width].classList.contains(
          'ghost-lair'
        )
      )
        this.pacmanCurrentIndex += this.width;
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      console.log('Up');
      if (
        this.pacmanCurrentIndex - this.width >= 0 &&
        !this.squares[this.pacmanCurrentIndex - this.width].classList.contains(
          'wall'
        ) &&
        !this.squares[this.pacmanCurrentIndex - this.width].classList.contains(
          'ghost-lair'
        )
      )
        this.pacmanCurrentIndex -= this.width;
    }
    this.renderer.addClass(this.squares[this.pacmanCurrentIndex], 'pac-man');
    this.pacDotEaten();
    this.powerPelletEaten();
    this.checkForGameOver(this.squares, this.pacmanCurrentIndex);
    this.checkforWin();
  }

  constructor(private renderer: Renderer2, private elem: ElementRef) {}

  createBoard() {
    for (let i = 0; i < this.layout.length; i++) {
      const square = this.renderer.createElement('div');
      this.renderer.appendChild(this.grid.nativeElement, square);
      this.squares.push(square);

      if (this.layout[i] === 0) {
        this.renderer.addClass(this.squares[i], 'pac-dot');
      } else if (this.layout[i] === 1) {
        this.renderer.addClass(this.squares[i], 'wall');
      } else if (this.layout[i] === 2) {
        this.renderer.addClass(this.squares[i], 'ghost-lair');
      } else if (this.layout[i] === 3) {
        this.renderer.addClass(this.squares[i], 'power-pellet');
      }
    }
  }

  ngOnInit() {}

  initGhosts() {
    this.ghosts.forEach((ghost) => {
      this.squares[ghost.currentIndex].classList.add('ghost');
      this.squares[ghost.currentIndex].classList.add(ghost.className);
      this.moveGhost(ghost);
    });
  }

  moveGhost(ghost) {
    // please implement this.
    let randomNo = function (start, range) {
      let ran = Math.floor(Math.random() * range + start);
      while (ran > range) {
        let ran = Math.floor(Math.random() * range + start);
      }
      return ran;
    };
    let rand = randomNo(1, 4);
    this.renderer.removeClass(this.squares[ghost.startIndex], ghost.className);
    this.renderer.removeClass(
      this.squares[ghost.currentIndex],
      ghost.className
    );
    if (rand === 1) {
      if (
        ghost.currentIndex - this.width >= 0 &&
        !this.squares[ghost.currentIndex + 1].classList.contains('wall')
      )
        ghost.nextIndex += 1;
      if (this.squares[ghost.currentIndex + 1] === this.squares[392]) {
        ghost.nextIndex = 364;
      }
    }

    if (rand === 2) {
      if (
        ghost.currentIndex % this.width !== 0 &&
        !this.squares[ghost.currentIndex - 1].classList.contains('wall')
      )
        ghost.nextIndex -= 1;
      if (this.squares[ghost.currentIndex - 1] === this.squares[363]) {
        ghost.nextIndex = 391;
      }
    }

    if (rand === 3) {
      if (
        ghost.currentIndex + this.width < this.width * this.width &&
        !this.squares[ghost.currentIndex + this.width].classList.contains(
          'wall'
        )
      )
        ghost.nextIndex += this.width;
    }

    if (rand === 4) {
      if (
        ghost.currentIndex - this.width >= 0 &&
        !this.squares[ghost.currentIndex - this.width].classList.contains(
          'wall'
        )
      )
        ghost.nextIndex -= this.width;
    }
    this.renderer.addClass(this.squares[ghost.nextIndex], ghost.className);
    ghost.currentIndex = ghost.nextIndex;
  }

  checkForGameOver(squaresX, pacmanCurrentIndexX) {
    if (
      squaresX[pacmanCurrentIndexX].classList.contains('ghost') ||
      squaresX[pacmanCurrentIndexX].classList.contains('blinky') ||
      squaresX[pacmanCurrentIndexX].classList.contains('pinky') ||
      squaresX[pacmanCurrentIndexX].classList.contains('inky') ||
      squaresX[pacmanCurrentIndexX].classList.contains('clyde')
    ) {
      this.ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      this.KeyUpEvent = function (): void {};
      this.result.nativeElement.innerHTML = 'Game Over!';
    }
  }

  checkforWin() {
    if (this.scoreValue === 274) {
      this.ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      this.KeyUpEvent = function (): void {};
      this.result.nativeElement.innerHTML = 'You have Won!';
    }
  }

  ngAfterViewInit() {
    // create the pac man board
    this.createBoard();
    this.renderer.addClass(this.squares[this.pacmanCurrentIndex], 'pac-man');
    this.initGhosts();
  }

  pacDotEaten() {
    if (this.squares[this.pacmanCurrentIndex].classList.contains('pac-dot')) {
      this.scoreValue++;
      this.score.nativeElement.innerHTML = this.scoreValue;
      this.squares[this.pacmanCurrentIndex].classList.remove('pac-dot');
    }
  }

  powerPelletEaten() {
    if (
      this.squares[this.pacmanCurrentIndex].classList.contains('power-pellet')
    ) {
      this.scoreValue += 10;
      this.score.nativeElement.innerHTML = this.scoreValue;
      this.ghosts.forEach((ghost) => {
        ghost.isScared = true;
        this.renderer.removeClass(
          this.squares[ghost.currentIndex],
          ghost.className
        );
        ghost.className = 'scared-ghost';
        this.renderer.addClass(this.squares[ghost.nextIndex], ghost.className);
        //this.moveGhost(ghost)
      });
      // this.ghosts.forEach(ghost => {

      //   // this.squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      //   //     //ghost.currentIndex = ghost.startIndex
      //   //     this.squares[ghost.nextIndex].classList.add(ghost.className, 'scared-ghost')

      // })
      setTimeout(() => {
        this.ghosts.forEach((ghost) => {
          ghost.isScared = false;
          this.renderer.removeClass(
            this.squares[ghost.currentIndex],
            ghost.className
          );
          ghost.className = ghost.classNamecopy;
          this.renderer.addClass(
            this.squares[ghost.nextIndex],
            ghost.className
          );
          // this.squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
          //ghost.currentIndex = ghost.startIndex
          // this.squares[ghost.nextIndex].classList.add(ghost.className, 'ghost')
        });
      }, 10000);
      this.squares[this.pacmanCurrentIndex].classList.remove('power-pellet');
    }
  }
}
