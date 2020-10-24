ff(FROM, TO) :- X = FROM, f(FROM, TO, X).
f(FROM, TO, X) :- in_diaposon(X, FROM, TO), ROOT = sqrt(X), int_check(ROOT), writeNumber(X), X_NEW = X + 1, f(FROM, TO, X_NEW); in_diaposon(X, FROM, TO), ROOT = sqrt(X), not_int_check(ROOT), X_NEW = X + 1, f(FROM, TO, X_NEW).
writeNumber(X) :- X_NEW is X, write(X_NEW), write(' ').
in_diaposon(X, S, F) :- X >= S, X =< F.

int_check(X) :- A = round(X), A =:= X.
not_int_check(X) :- A = round(X), A > X; A = round(X), A < X.

a :- write("Number 1: "), nl,
     read(A), nl, 
     write("Number 2: "), nl,
     read(B), nl,
     ff(A, B).