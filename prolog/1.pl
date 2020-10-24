fib_func2(FROM, TO) :- st(FROM, 1), A = 1, B = 1, fib2(A, B, FROM, TO); A = 1, B = 1, fib2(A, B, FROM, TO).
fib2(A, B, FROM, TO) :- in_diaposon(B, FROM, TO),  writeNumber(B), A_NEW is B, B_NEW = B + A, fib2(A_NEW, B_NEW, FROM, TO); B < FROM, A_NEW is B, B_NEW = B + A, fib2(A_NEW, B_NEW, FROM, TO); write("").
st(S, A) :- S =< A, write("1 ").
writeNumber(X) :- X_NEW is X, write(X_NEW), write(' ').
in_diaposon(X, S, F) :- X >= S, X =< F.

a :- write("Number 1: "), nl,
     read(A), nl, 
     write("Number 2: "), nl,
     read(B), nl,
     fib_func2(A, B).