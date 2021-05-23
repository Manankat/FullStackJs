import React, { useState, useContext, useCallback, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('localhost:4000');

export const SomeChild = () => {
    useEffect(() => {
        console.log(socket);
        socket.on('MOVE', data => {
            console.log("Some One Moved")
        });
        return () => {
            socket.off('MOVE');
        };
    });

    const moveRequest = () => {
        socket.emit('moveRequest');
    }

    return (
        <div>
            <button onClick={moveRequest}>
                Move
      </button>
        </div>
    );
};