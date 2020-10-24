c(X, Y, Z) :- in_diaposon(X, Z, Y), writeNumber3(X), X_NEW = X + 1, c(X_NEW, Y, Z); X < Z,  X_NEW = X + 1, c(X_NEW, Y, Z).
writeNumber3(X) :- X_NEW is X, write(X_NEW), write(' ').

in_diaposon(X, S, F) :- X >= S, X =< F.

