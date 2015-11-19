Hi there! I had some fun throwing together these challenges.
Lots more I could work on but I have run out of time.

# Tic Tac Toe

I read the requirements at night. Woke up the next morning and the
childhood game "Rock, Paper, Scissors" morphed into "Tic Tac Toe" while I
dreamed.  I was mostly done implementing it when I read the spec again
and laughed at my stupidity.  I finished it because I was close, so its a
bonus.

# Rock, Paper, Scissors

Very minimal.  I had spent most of my time on Tic Tac Toe.  Its works but there are some major caveats; most notably I did not implement any security.  There should be server side verification of state changes (also applies to Tic Tac Toe).

# Sorting

I use the standard python sort algorithm which is Tim Sort[1].  It has average
case performance of O(n log(n)). I wrote two different implementations, one
using a cmp function (not natively supported for Python 3 anymore[2] and
considered to be slower in most cases[3]) and one using a key.  The key
solution converts the strings to a string sortable with standard ordering, the
cmp just compares two values using the specified ordering.  The reason I wrote
the compare version is because it can lazily evaluate a string where the key
version has to convert the entire string.  This causes a big difference if
strings are really large.  The test_large test runs in 3 seconds on my computer
using the key method and in less than 0.02 seconds using the compare method. It
is possible that the key version has an advantage when there are a lot of short
strings to sort.

[1]: https://en.wikipedia.org/wiki/Timsort
[2]: https://docs.python.org/3.5/library/functools.html#functools.cmp_to_key
[3]: https://docs.python.org/2.7/library/functions.html#sorted
