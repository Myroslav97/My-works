window.addEventListener('load', () => {
    const container = document.getElementsByClassName('container')[0];
    const reLoad = document.getElementById('reset');


    for (let i = 0; i < 9; i++) {
        let boardGame = document.createElement('div');
        boardGame.classList.add('tile');
        container.appendChild(boardGame);
    }

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const announcer = document.querySelector('.announcer');
    const PlayerDisplay = document.querySelector('.display-player');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const playerXWOn = 'PLAYER_X_WON';
    const playerOWOn = 'PLAYER_O_WON';
    const tie = 'TIE';

    const winingConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winingConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? playerXWOn : playerOWOn);
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(tie);
        }
    }

    const announce = (type) => {
        switch (type) {
            case playerOWOn:
                announcer.innerHTML = 'Player <span class = "playerO">O</span> Won'
                break;
            case playerXWOn:
                announcer.innerHTML = 'Player <span class = "playerX">X</span> Won'
                break;
            case tie:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidation = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        PlayerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        PlayerDisplay.innerText = currentPlayer;
        PlayerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (tile, index) => {
        if (isValidation(tile) && gameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetboard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        })
    };

    tiles.forEach((tile, index) => tile.addEventListener('click', () => userAction(tile, index)));


    reLoad.addEventListener('click', resetboard);

    const draggables = document.querySelectorAll('.avatar-icon');

    for (let avatar of draggables) {
        avatar.setAttribute('draggable', true);
        avatar.addEventListener('dragstart', () => {
            avatar.classList.add('dragging');
        })
        avatar.addEventListener('dragend', () => {
            avatar.classList.remove('dragging');
        })
    }
    const avatarsContainers = document.querySelectorAll('.avatar-container');

    avatarsContainers.forEach(container => {
        container.addEventListener('dragover', e => {
            if (!container.childNodes.length) {
                e.preventDefault()
                const draggable = document.querySelector('.dragging');
                container.appendChild(draggable);
            }
        })
    })
})