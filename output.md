This file is the full documentation for the Uiua programming language.
The documentation is organized into pages marked by the <page> tag.
The url attribute of the <page> tag is the URL of the page on the Uiua website.
The content of the <page> tag is the markdown content of the page.
Links in the markdown content often link to other pages in the documentation.

<page url="https://www.uiua.org/docs/&clset">

# [&clset](/docs/&clset) \- set clipboard contents

### Monadic 0-output function

Set the contents of the clipboard

Expects a string.

```uiua
&clset +@A⇡6 # Try running then pasting!
```
  
See also: [&clget](/docs/&clget)

</page>

<page url="https://www.uiua.org/docs/sign">

# [± sign](/docs/sign)

### Monadic pervasive function

Numerical sign (1, ¯1, or 0)

```uiua
± 1
```

```output
1
```

```uiua
± ¯5
```

```output
¯1
```

```uiua
± 0
```

```output
0
```

```uiua
± [¯2 ¯1 0 1 2]
```

```output
[¯1 ¯1 0 1 1]
```

[± sign](/docs/sign) on a [ℂ complex](/docs/complex) number normalizes it to a magnitude of 1.

```uiua
± ℂ3 4
```

```output
0.8+0.6i
```
  
[± sign](/docs/sign) also works on characters to get their case.

\- `¯1` for lowercase

\- `1` for uppercase

\- `0` for caseless

```uiua
± "Hello, World!"
```

```output
[1 ¯1 ¯1 ¯1 ¯1 0 0 1 ¯1 ¯1 ¯1 ¯1 0]
```

</page>

<page url="https://www.uiua.org/docs/&args">

# [&args](/docs/&args) \- arguments

### Noadic function

Get the command line arguments

The first element will always be the name of your script

</page>

<page url="https://www.uiua.org/docs/subtract">

# [\- subtract](/docs/subtract)

### Dyadic pervasive function

Subtract values

The first value is subtracted from the second.

This is so you can think of `-` `x` as a single unit.

```uiua
-1 2
```

```output
1
```

```uiua
-1 [2 3 4]
```

```output
[1 2 3]
```

```uiua
- [1 2 3] [4 5 6]
```

```output
[3 3 3]
```

</page>

<page url="https://www.uiua.org/docs/by">

# [⊸ by](/docs/by)

### Monadic modifier

Duplicate a function's last argument before calling it

If you want to filter out every element of an array that is not [< less than](/docs/less than) 10, you can use [▽ keep](/docs/keep).

```uiua
▽<10. [1 27 8 3 14 9]
```

```output
[1 8 3 9]
```

However, if you want to make this a function, you have to [⊙ dip](/docs/dip) below the first arguement to [. duplicate](/docs/duplicate) the array.

```uiua
F ← ▽<⊙.
F 10 [1 27 8 3 14 9]
```

```output
[1 8 3 9]
```

While this works, it may take a moment to process in your mind how the stack is changing.

[⊸ by](/docs/by) expresses the common pattern of performing an operation but preserving the last argument so that it can be used again.

With [⊸ by](/docs/by), the filtering function above can be written more simply.

```uiua
F ← ▽⊸<
F 10 [1 27 8 3 14 9]
```

```output
[1 8 3 9]
```

Here are some more examples of [⊸ by](/docs/by) in action.

```uiua
⊂⊸↙ 2 [1 2 3 4 5]
⊜□⊸≠ @  "Hey there buddy"
⊕□⊸◿ 5 [2 9 5 21 10 17 3 35]
```

```output
[1 2 1 2 3 4 5]
{"Hey" "there" "buddy"}
{[5 10 35] [21] [2 17] [3] [9]}
```

</page>

<page url="https://www.uiua.org/docs/&sc">

# [&sc](/docs/&sc) \- scan line

### Noadic function

Read a line from stdin

The normal output is a string.

If EOF is reached, the number `0` is returned instead.

Programs that wish to properly handle EOF should check for this.

</page>

<page url="https://www.uiua.org/docs/&tcpc">

# [&tcpc](/docs/&tcpc) \- tcp - connect

### Monadic function

Create a TCP socket and connect it to an address

Returns a stream handle

You can make a request with [&w](/docs/&w) and read the response with [&rs](/docs/&rs), [&rb](/docs/&rb), or [&ru](/docs/&ru).

[⍜ under](/docs/under)[&tcpc](/docs/&tcpc) calls [&cl](/docs/&cl) automatically.

```uiua
"GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n"
⍜(&tlsc "example.com:443"|&rs∞⊸&w:)
```

```output
Error: TLS sockets are not supported in this environment
  at 2:3
2 | ⍜(&tlsc "example.com:443"|&rs∞⊸&w:)
      ─────
```
  
See also: [&tlsc](/docs/&tlsc)

</page>

<page url="https://www.uiua.org/docs/box">

# [□ box](/docs/box)

### Monadic function

Turn an array into a box

This is Uiua's primary way to create nested or mixed-type arrays.

Normally, arrays can only be created if their rows have the same shape and type.

[⬚ fill](/docs/fill) can help you with the shape part, but it is not always wanted, and it can't help with the type part.

```uiua
[@a 3 7_8_9]
```

```output
Error: Cannot couple character array with number array
  at 1:1
1 | [@a 3 7_8_9]
    ────────────
```

[□ box](/docs/box) creates a box element that contains the array. All boxes, no matter the type of shape of their contents, are considered the same type and can be put into arrays together.

```uiua
[□@a □3 □7_8_9]
```

```output
{@a 3 [7 8 9]}
```

The more ergonomic way to make box arrays is to use `{}`s instead of `[]`s.

```uiua
{@a 3 7_8_9}
```

```output
{@a 3 [7 8 9]}
```

Use [° un](/docs/un)[□ box](/docs/box) to get the values back out.

```uiua
°□ □1_2_3
```

```output
[1 2 3]
```

Use [° un](/docs/un) with `{}`s, [⊙ dip](/docs/dip)s, and [∘ identity](/docs/identity) to get the values back onto the stack

```uiua
°{⊙⊙∘} {@a 3 7_8_9}
```

```output
[7 8 9]
3
@a
```
  
You would not normally construct arrays like the one above.

The more important use case of [□ box](/docs/box) is for jagged or nested data.

If you want to collect unevenly-sized groups from [⊜ partition](/docs/partition) or [⊕ group](/docs/group), without [⬚ fill](/docs/fill)ing, you must use [□ box](/docs/box).

```uiua
$ Words of different lengths
⊜□≠@ .
```

```output
{"Words" "of" "different" "lengths"}
```
  
Pervasive functions work through boxes and preserve the maximum [□ box](/docs/box) depth of their arguments.

```uiua
¯ 1
¯ □1
¯ □□1
```

```output
¯1
□¯1
□□¯1
```

```uiua
+1 4
+1 □4
+1 □□4
+□□1 4
```

```output
5
□5
□□5
□□5
```

There is an exception for comparison functions, which compare lexicographically if both arguments are boxes.

```uiua
=  [1 2 3]  [1 2 5]
= □[1 2 3] □[1 2 5]
>  [1 2 3]  [1 2 5]
> □[1 2 3] □[1 2 5]
>  "banana"  "orange"
> □"banana" □"orange"
> □"banana"  "orange"
```

```output
[1 1 0]
0
[0 0 1]
1
[1 1 0 1 0 1]
1
{[1 1 1 1 1 1] [1 1 1 1 1 1] [0 0 0 0 0 0] [1 1 0 1 0 1] [1 1 0 1 0 1] [1 1 0 1 0 1]}
```
  
For non-pervasive functions, boxed arrays need to be [° un](/docs/un)[□ box](/docs/box)ed before they can be operated on.

```uiua
⊢  □[1 2 3]
```

```output
⟦1 2 3⟧
```

```uiua
⊢ °□[1 2 3]
```

```output
1
```

[⍜ under](/docs/under)[° un](/docs/un)[□ box](/docs/box) is useful when you want to re-[□ box](/docs/box) the result.

```uiua
$ Reverse these words
⊜□≠@ .
∵⍜°□⇌.
```

```output
{"Reverse" "these" "words"}
{"esreveR" "eseht" "sdrow"}
```

```uiua
{"Hey" "there" "world"}
≡⍜°□(⊂⊢.)
```

```output
{"HHey" "tthere" "wworld"}
```

```uiua
PrepLen ← $"_ _"⧻.
.⊜□≠@ . $ Prepend the word length
∵⍜°□PrepLen
```

```output
{"Prepend" "the" "word" "length"}
{"7 Prepend" "3 the" "4 word" "6 length"}
```

[⍜ under](/docs/under)[° un](/docs/un)[□ box](/docs/box) works because [°](/docs/un)[°](/docs/un)[□](/docs/box) is just [□](/docs/box). For each element, it [° un](/docs/un)[□ box](/docs/box)es the array out, does something to it, then [□ box](/docs/box)es the result.

```uiua
.{1_2_3 4_5 [7]}
∵⍜°□(⬚0↙3)
```

```output
{[1 2 3] [4 5] [7]}
{[1 2 3] [4 5 0] [7 0 0]}
```

If you do not need to re-[□ box](/docs/box) the result, you can use [◇ content](/docs/content) instead.

[◇ content](/docs/content) [° un](/docs/un)[□ box](/docs/box)es all box elements that are passed to a function before calling it.

```uiua
{1_2_3 9_2 5_5_5_5}
≡◇/+
```

```output
[6 11 20]
```

This is the main way to [⊂ join](/docs/join) a list of [□ box](/docs/box)ed strings.

```uiua
/◇⊂       {"Join" "these" "strings"}
```

```output
"Jointhesestrings"
```

```uiua
/◇(⊂⊂:@ ) {"Join" "these" "strings"}
```

```output
"Join these strings"
```

</page>

<page url="https://www.uiua.org/docs/has">

# [has](/docs/has)

### Dyadic function

Check if a map array has a key

See [map](/docs/map) for an overview of map arrays.
  
```uiua
map 1_2 3_4
[fork(has 2|has 5)].
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
[1 0]
```
  
See also: [insert](/docs/insert), [get](/docs/get), [remove](/docs/remove)

</page>

<page url="https://www.uiua.org/docs/repr">

# [repr](/docs/repr)

### Monadic function

Convert a value to its code representation

```uiua
repr π
```

```output
"π"
```

Use [&p](/docs/&p)[repr](/docs/repr) to produce a representation that can be pasted directly into the

interpreter.

```uiua
&p repr ↯2_2_2 0
```

```output
[[[0 0] [0 0]] [[0 0] [0 0]]]

```

```uiua
&p repr {"Uiua" @A [1 2 3] □4}
```

```output
{"Uiua" @A [1 2 3] □4}

```
  
[repr](/docs/repr) can be used in array macros to make the macro generate code that produces the same array.

```uiua
F! ←^ ⧻°□⊢
F!+
```

```output
Error: Macro output rows must be strings, but its type is number
  in macro expansion at 2:1
```

```uiua
F! ←^ repr ⧻°□⊢
F!+
F!≡(¬×)
F!repr
F!(.....)
```

```output
1
5
4
5
```
  
Append commas to whitespace for a more traditional notation:

```uiua
-5↯2_2_3⇡12
⍜⊜□⍚(⊂@,)∊," \n" repr # add commas
&p ⍜▽∵⋅@-=@¯.         # replace negate glyphs with minus signs
```

```output
[[[-5, -4, -3], [-2, -1, 0]], [[1, 2, 3], [4, 5, 6]]]

```

</page>

<page url="https://www.uiua.org/docs/json">

# [json](/docs/json)

### Monadic function

Encode an array into a JSON string

```uiua
json [1 2 3]
```

```output
"[1,2,3]"
```

```uiua
json {"some" "words"}
```

```output
"["some","words"]"
```

```uiua
json map {"hey" "there" "buddy"} {1 2 [3 4 5]}
```

```output
"{"buddy":[3,4,5],"hey":1,"there":2}"
```

You can use [° un](/docs/un)[json](/docs/json) to decode a JSON string back into an array.

```uiua
°json "[4,5,6]"
```

```output
[4 5 6]
```

```uiua
°json $ ["what's","the","plan"]
```

```output
{"what's" "the" "plan"}
```

```uiua
°json $ {"foo": "bar", "baz": [1, 2, 3]}
```

```output
╭─                 
  ⌜baz⌟ → ⟦1 2 3⟧  
  ⌜foo⌟ → ⌜bar⌟    
                  ╯
```
  
While the number literals `0` and `1` are converted to their number equivalents in JSON, the shadowable constants `True` and `False` are converted to JSON `true` and `false`.

```uiua
json {0 1 2 3 True False}
```

```output
"[0,1,2,3,true,false]"
```
  
While [json](/docs/json) always produces ECMA-compliant JSON, [° un](/docs/un)[json](/docs/json) can parse [JSON5](https://json5.org/).

This means that you can use single quotes, unquoted keys, trailing commas, and comments.

```uiua
°json $ {foo: 'bar', /* cool */ baz: [1, 2, 3,],}
```

```output
╭─                 
  ⌜baz⌟ → ⟦1 2 3⟧  
  ⌜foo⌟ → ⌜bar⌟    
                  ╯
```
  
Note that `NaN` and [∞ infinity](/docs/infinity) convert to JSON `null`, and JSON `null` converts to `NaN`.

This means that [∞ infinity](/docs/infinity) is converted to `NaN` in a round-trip.

```uiua
json [1 ¯5 NaN ∞]
```

```output
"[1,-5,null,null]"
```

```uiua
°json "[1,null,-3,null]"
```

```output
[1 NaN ¯3 NaN]
```

</page>

<page url="https://www.uiua.org/docs/&runc">

# [&runc](/docs/&runc) \- run command capture

### Monadic 3-output function

Run a command and wait for it to finish

Standard IO will be captured. The exit code, stdout, and stderr will each be pushed to the stack.
  
Expects either a string, a rank `2` character array, or a rank `1` array of [□ box](/docs/box) strings.

</page>

<page url="https://www.uiua.org/docs/chunks">

# [chunks](/docs/chunks)

### Dyadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Get the n-wise chunks of an array

[chunks](/docs/chunks) produces non-overlapping subarrays of equal size.

```uiua
# Experimental!
chunks 3 [1 2 3 4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

```uiua
# Experimental!
≡≡□ chunks 2_3 . °△ 4_6
```

```output
╭─                   
╷  0  1  2  3  4  5  
   6  7  8  9 10 11  
  12 13 14 15 16 17  
  18 19 20 21 22 23  
                    ╯
╭─                           
╷  ╓─          ╓─            
   ╟ 0 1 2     ╟ 3  4  5     
     6 7 8       9 10 11     
           ╜             ╜   
  ╓─           ╓─            
  ╟ 12 13 14   ╟ 15 16 17    
    18 19 20     21 22 23    
             ╜            ╜  
                            ╯
```

If the chunk size does not evenly divide the shape of the array, the edge chunks will be omitted.

```uiua
# Experimental!
chunks 3 [1 2 3 4 5 6 7 8]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

```uiua
# Experimental!
≡≡□ chunks 2_2 . °△ 5_5
```

```output
╭─                
╷  0  1  2  3  4  
   5  6  7  8  9  
  10 11 12 13 14  
  15 16 17 18 19  
  20 21 22 23 24  
                 ╯
╭─                     
╷  ╓─        ╓─        
   ╟ 0 1     ╟ 2 3     
     5 6       7 8     
         ╜         ╜   
  ╓─        ╓─         
  ╟ 10 11   ╟ 12 13    
    15 16     17 18    
          ╜         ╜  
                      ╯
```

If [⬚ fill](/docs/fill) is used, the edge chunks will be filled with the fill value.

```uiua
# Experimental!
⬚0chunks 3 [1 2 3 4 5 6 7 8]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 0  
        ╯
```

```uiua
# Experimental!
≡≡□ ⬚0chunks 2_2 . °△ 5_5
```

```output
╭─                
╷  0  1  2  3  4  
   5  6  7  8  9  
  10 11 12 13 14  
  15 16 17 18 19  
  20 21 22 23 24  
                 ╯
╭─                              
╷  ╓─        ╓─       ╓─        
   ╟ 0 1     ╟ 2 3    ╟ 4 0     
     5 6       7 8      9 0     
         ╜         ╜        ╜   
  ╓─        ╓─        ╓─        
  ╟ 10 11   ╟ 12 13   ╟ 14 0    
    15 16     17 18     19 0    
          ╜         ╜        ╜  
  ╓─        ╓─        ╓─        
  ╟ 20 21   ╟ 22 23   ╟ 24 0    
     0  0      0  0      0 0    
          ╜         ╜        ╜  
                               ╯
```

Negative chunk sizes specify the number of chunks desired.

```uiua
# Experimental!
chunks ¯2 [1 2 3 4 5 6]
chunks ¯3 [1 2 3 4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─     
╷ 1 2  
  3 4  
  5 6  
      ╯
```

Negative and positive chunk sizes can be mixed.

```uiua
# Experimental!
≡≡□ chunks ¯2_2 . °△ 6_6
```

```output
╭─                   
╷  0  1  2  3  4  5  
   6  7  8  9 10 11  
  12 13 14 15 16 17  
  18 19 20 21 22 23  
  24 25 26 27 28 29  
  30 31 32 33 34 35  
                    ╯
╭─                               
╷ ╓─        ╓─        ╓─         
  ╟  0  1   ╟  2  3   ╟  4  5    
     6  7      8  9     10 11    
    12 13     14 15     16 17    
          ╜         ╜         ╜  
  ╓─        ╓─        ╓─         
  ╟ 18 19   ╟ 20 21   ╟ 22 23    
    24 25     26 27     28 29    
    30 31     32 33     34 35    
          ╜         ╜         ╜  
                                ╯
```

</page>

<page url="https://www.uiua.org/docs/scan">

# [\\ scan](/docs/scan)

### Monadic 1-argument modifier

Reduce, but keep intermediate values

```uiua
\+   1_2_3_4
```

```output
[1 3 6 10]
```

```uiua
\-   1_2_3_4
```

```output
[1 1 2 2]
```

```uiua
\(-:) 1_2_3_4
```

```output
[1 ¯1 ¯4 ¯8]
```

[\\ scan](/docs/scan) is often used to do something with masks.

[\\ scan](/docs/scan)ning with [↧ minimum](/docs/minimum) or [↥ maximum](/docs/maximum) will propogate `0`s or `1`s.

```uiua
▽\↧≠@ . "Hello World!"
```

```output
"Hello"
```

[\\ scan](/docs/scan)ning with [+ add](/docs/add) and then using [⊕ group](/docs/group) can split by a delimiter while keeping the delimiter.

```uiua
⊕□\+=@    . "Everyday man's on the block"
⊕□\+↻¯1=@ . "Everyday man's on the block"
```

```output
{"Everyday" " man's" " on" " the" " block"}
{"Everyday " "man's " "on " "the " "block"}
```

</page>

<page url="https://www.uiua.org/docs/&tcpsrt">

# [&tcpsrt](/docs/&tcpsrt) \- tcp - set read timeout

### Dyadic 0-output function

Set the read timeout of a TCP socket in seconds

</page>

<page url="https://www.uiua.org/docs/random">

# [⚂ random](/docs/random)

### Noadic function

Generate a random number in the range `[0, 1)`

If you need a seeded random number, use [gen](/docs/gen).
  
```uiua
⚂
```

```output
0.7279191471263432
```

```uiua
[⚂⚂⚂]
```

```output
[0.6568772340574585 0.9858040607606396 0.7967212873967947]
```
  
Use [× multiply](/docs/multiply) and [⌊ floor](/docs/floor) to generate a random integer in a range.

```uiua
⌊×10 [⍥⚂5]
```

```output
[2 6 0 7 6]
```
  
[∵](/docs/each)[⋅](/docs/gap)`rand` and [⊞](/docs/table)[⋅](/docs/gap)[⋅](/docs/gap)`rand` are optimized in the interpreter to generate a lot of random numbers very fast.

```uiua
⌊×10 ∵⋅⚂ ⇡10
```

```output
[6 1 1 4 9 3 4 8 0 7]
```

```uiua
⌊×10 ⊞⋅⋅⚂ .⇡10
```

```output
╭─                     
╷ 1 1 6 2 7 5 2 8 0 6  
  8 6 2 9 6 3 3 2 4 5  
  0 7 4 3 4 8 1 4 1 4  
  0 6 0 8 4 0 9 4 5 5  
  3 8 7 8 0 5 0 3 1 6  
  4 6 4 6 1 7 5 9 6 0  
  1 4 2 6 0 9 4 2 2 2  
  2 9 8 2 7 0 5 9 9 3  
  4 0 9 4 4 9 6 9 0 0  
  1 1 6 6 7 2 0 5 6 7  
                      ╯
```

</page>

<page url="https://www.uiua.org/docs/pool">

# [pool](/docs/pool)

### Monadic modifier

Spawn a thread in a thread pool

Has the same functionality as [spawn](/docs/spawn), but uses a thread pool instead of spawning a new thread.

While [spawn](/docs/spawn)'s function will be called immediately, [pool](/docs/pool)'s function will be called when a thread in the pool is available.

The thread pool has as many threads as the machine has processors.

If all threads in the pool are busy, then [pool](/docs/pool) will block until a thread is available.

</page>

<page url="https://www.uiua.org/docs/tau">

# [τ tau](/docs/tau)

### Constant

The ratio of a circle's circumference to its radius

Equivalent to [×](/docs/multiply)`4`[η](/docs/eta) or [×](/docs/multiply)`2`[π](/docs/pi)

```uiua
[×4η ×2π τ]
```

```output
[τ τ τ]
```

</page>

<page url="https://www.uiua.org/docs/&clget">

# [&clget](/docs/&clget) \- get clipboard contents

### Noadic function

Get the contents of the clipboard

Returns a string of the clipboard's contents.

This is not supported on the web.
  
See also: [&clset](/docs/&clset)

</page>

<page url="https://www.uiua.org/docs/inventory">

# [⍚ inventory](/docs/inventory)

### Monadic modifier

Apply a function to each unboxed row of an array and re-box the results

For box arrays, this is equivalent to [≡](/docs/rows)[⍜](/docs/under)[°](/docs/un)[□](/docs/box).

```uiua
≡⍜°□(⊂:@!) {"a" "bc" "def"}
   ⍚(⊂:@!) {"a" "bc" "def"}
```

```output
{"a!" "bc!" "def!"}
{"a!" "bc!" "def!"}
```

For non-box arrays, [⍚ inventory](/docs/inventory) works identically to [≡ rows](/docs/rows), except it [□ box](/docs/box)es each result row.

```uiua
≡⇌ [1_2_3 4_5_6]
⍚⇌ [1_2_3 4_5_6]
```

```output
╭─       
╷ 3 2 1  
  6 5 4  
        ╯
{[3 2 1] [6 5 4]}
```

This can be useful when you expect the function to yield arrays of different [△ shape](/docs/shape)s.

```uiua
⍚⇡ [3 8 5 4]
```

```output
{[0 1 2] [0 1 2 3 4 5 6 7] [0 1 2 3 4] [0 1 2 3]}
```

```uiua
⍚↙⊙¤ [2 0 3 4 1] [4 8 9 2]
```

```output
{[4 8] [] [4 8 9] [4 8 9 2] [4]}
```

For a box and non-box array, [⍚ inventory](/docs/inventory) will unbox the box array's rows and then re-box the results.

```uiua
⍚⊂ {"a" "bc" "def"} "123"
```

```output
{"a1" "bc2" "def3"}
```
  
A common use case is in conjunction with [⍜ under](/docs/under) and boxing array notation as a sort of n-wise [∩ both](/docs/both).

```uiua
{⍜ {⊙⊙∘}⍚⊂    1_2 3_4_5 6_7_8_9 10}
{⍜⊙{⊙⊙∘}⍚⊂ 10 1_2 3_4_5 6_7_8_9   }
```

```output
{[1 2 10] [3 4 5 10] [6 7 8 9 10]}
{[10 1 2] [10 3 4 5] [10 6 7 8 9]}
```

</page>

<page url="https://www.uiua.org/docs/constants">

# Constants

These constants are available in every scope. However, unlike formattable constants like [π pi](/docs/pi), these constants can be shadowed within a scope.

```uiua
e
e ← 5
e
```

```output
2.718281828459045
5
```
  
`e` \- Euler's constant

`i` \- The imaginary unit

`NaN` \- IEEE 754-2008's \`NaN\`

`W` \- The wildcard \`NaN\` value that equals any other number

`MaxInt` \- The maximum integer that can be represented exactly

`Os` \- A string identifying the operating system

`Family` \- A string identifying family of the operating system

`Arch` \- A string identifying the architecture of the CPU

`ExeExt` \- The executable file extension

`DllExt` \- The file extension for shared libraries

`Sep` \- The primary path separator character

`ThisFile` \- The path of the current source file relative to \`WorkingDir\`

`ThisFileName` \- The name of the current source file

`ThisFileDir` \- The name of the directory containing the current source file

`WorkingDir` \- The compile-time working directory

`NumProcs` \- The number of processors available

`True` \- A boolean \`true\` value for use in \`json\`

`False` \- A boolean \`false\` value for use in \`json\`

`NULL` \- A NULL pointer for use in FFI

`HexDigits` \- The hexadecimal digits

`Days` \- The days of the week

`Months` \- The months of the year

`MonthDays` \- The number of days in each month in a non-leap year

`LeapMonthDays` \- The number of days in each month in a leap year

`Planets` \- The planets of the solar system

`Zodiac` \- The symbols of the zodiac

`Suits` \- The suits of a standard deck of playing cards

`Cards` \- The ranks of a standard deck of playing cards

`Chess` \- The symbols of the standard chess pieces

`Moon` \- The phases of the moon

`Skin` \- Skin color modifiers for emoji

`People` \- People emoji

`Hair` \- Emoji hair components

`Logo` \- The Uiua logo

`Lena` \- Ethically sourced Lena picture

`Music` \- Sample music data

</page>

<page url="https://www.uiua.org/tutorial/modules">

# Modules

Modules are a way to organize your code in Uiua. They can either be defined in a scope, or imported from a file. Any Uiua file can be used as a module.

Modules can be compared to namespaces in other languages.

## [Scoped Modules](#scoped-modules)

Scoped modules are defined between a pair of `---`s. The first `---` should be immediately followed by a name for the module. Module names follow the same rules as other bindings.

Names from inside the module can be referenced by following the module name with a `~`.

```uiua
---Mod
  A ← 5
  F ← +1
  G ← F F
---
Mod~G Mod~A
```

```output
7
```

Bindings defined inside a scoped module are only visible inside the module.

```uiua
---Mod
  A ← 5
  F ← +1
  G ← F F
---
G A
```

```output
Error: Unknown identifier `A`
  at 6:3
6 | G A
      ─
```

Names from inside the module can be _made_ visible by following the module name with a `~` and a list of the names to make visible.

```uiua
---Mod ~ A G
  A ← 5
  F ← +1
  G ← F F
---
G A
```

```output
7
```

Names defined above the module can be referenced inside it.

```uiua
B ← 5
---Mod
  C ← ×2 B
---
Mod~C
```

```output
10
```

## [Files on the Website](#web-files)

Using files as modules involves loading files from the file system.

This website has a virtual file system. You can write to virtual files with [&fwa](/docs/&fwa). You can also drag and drop files from your computer into the editor to make them available to import.

There is also a test module that can always be imported as `example.ua`. Its contents is:

```uiua
# Uiua's example module

Square ← ×.
Double ← +.
Increment ← +1
RangeDiff ↚ ⇡-
Span ← +⟜RangeDiff
Mac! ← /^! [1 2 3 4 5]
Foo ← 5
Bar ← "bar"
```

## [Importing Modules](#importing)

Modules can be imported by file path with `~`.

```uiua
~ "example.ua"
```

This is not very useful on its own. We can bind items from the module in the current scope by listing them after the file path, separated by an additional `~`.

```uiua
~ "example.ua" ~ Increment Square

Increment Square 3
```

```output
10
```

If we have a lot of items to import, we can use multiple lines.

```uiua
~ "example.ua"
~ Increment Square
~ Span
~ Foo Bar

Increment Square Foo
Span 4 10
```

```output
26
[4 5 6 7 8 9]
```

The formatter will automatically indent the imports if they are on multiple lines. It will also alphabetize them. Try it out!

## [Binding Modules](#binding)

If we put a name before the import, we can bind the module to that name.

We can then reference items from that module anywhere using a `~`.

```uiua
Ex ~ "example.ua"

Ex~Increment 10
```

```output
11
```

This can be mixed and matched with the other import syntax.

```uiua
Ex ~ "example.ua" ~ Increment Square

Ex~Double Square 3
Ex~Mac!×
Increment Ex~Bar
```

```output
18
120
"cbs"
```

## [Aliasing Module Items](#aliasing)

If you want to be able to refer to an item from a module with a different name, simply make a binding with the new name.

```uiua
Ex ~ "example.ua"
Sqr ← Ex~Square
Sp ← Ex~Span

Sp⟜Sqr 3
```

```output
[3 4 5 6 7 8]
```

These bindings will also get indented by the formatter if they immediately follow the import.

## [Visibility](#visibility)

All bindings in a module bound with the normal `←` arrow are public and can be used by importers of the module.

However, modules imported in modules, as well as their same-name imports (the names on lines that start with `~`), are private.

You may have noticed in the example file that one binding uses a special `↚` arrow. This indicates that the binding is private.

Private bindings cannot be accessed from outside the file in which they are defined.

```uiua
~ "example.ua" ~ RangeDiff
```

```output
Error: `RangeDiff` is private
  at 1:18
1 | ~ "example.ua" ~ RangeDiff
                     ─────────
```

To enter this arrow, you can put a `~` after a binding's normal `←` or `=`.

Try formatting the following example to see how this works.

```uiua
A = +1
B ← +2
C =~ +3
D ←~ +4
```

## [Git Modules](#git-modules)

Modules can be imported from Git repositories. Instead of a path, use a URL prefixed with `git:`.

The Uiua GitHub organization hosts an example module at <https://github.com/uiua-lang/example-module>. The protocol specification can be omitted.

```uiua
~ "git: github.com/uiua-lang/example-module" ~ Upscale
Upscale 3 [1_2 3_4]
```

```output
Error: Waiting for module, try running to check...
  at 1:3
1 | ~ "git: github.com/uiua-lang/example-module" ~ Upscale
      ──────────────────────────────────────────
```

On the site, code is pulled from a `lib.ua` file at the root of the repository. Loading other files on the site is not supported.

To use Git modules in the [native interpreter](/docs/install), you must have Git installed. The repository is added as a Git submodule and the `lib.ua` file is loaded as the module's contents. Code from other files can be made available by importing them as modules in the `lib.ua` file.

The native interpreter also supports adding an additional `branch: <branch-name>` or `commit: <commit-hash>` specifier after the URL.

You can find a curated list of Uiua modules [here](https://github.com/uiua-lang/uiua-modules).

</page>

<page url="https://www.uiua.org/docs/&runi">

# [&runi](/docs/&runi) \- run command inherit

### Monadic function

Run a command and wait for it to finish

Standard IO will be inherited. Returns the exit code of the command.
  
Expects either a string, a rank `2` character array, or a rank `1` array of [□ box](/docs/box) strings.

</page>

<page url="https://www.uiua.org/docs/less%20or%20equal">

# [≤ less or equal](/docs/less or equal)

### Dyadic pervasive function

Compare for less than or equal

Formats from `<=`.
  
The second value is checked to be less than or equal to the first.

This is so you can think of `≤` `x` as a single unit.

```uiua
≤1 2
```

```output
0
```

```uiua
≤5 5
```

```output
1
```

```uiua
≤7 3
```

```output
1
```

```uiua
≤2 [1 2 3]
```

```output
[1 1 0]
```

```uiua
≤ [1 2 2] [1 2 3]
```

```output
[1 1 0]
```

</page>

<page url="https://www.uiua.org/docs/pi">

# [π pi](/docs/pi)

### Constant

The ratio of a circle's circumference to its diameter

Equivalent to [×](/docs/multiply)`2`[η](/docs/eta) or [÷](/docs/divide)`2`[τ](/docs/tau)

```uiua
[×2η π ÷2τ]
```

```output
[π π π]
```

</page>

<page url="https://www.uiua.org/docs/&ap">

# [&ap](/docs/&ap) \- audio - play

### Monadic 0-output function

Play some audio

The audio must be a rank 1 or 2 numeric array.
  
A rank 1 array is a list of mono audio samples.

For a rank 2 array, each row is a channel.
  
The samples must be between -1 and 1.

The sample rate is [&asr](/docs/&asr).
  
See also: [&ae](/docs/&ae)

</page>

<page url="https://www.uiua.org/docs/setinv">

# [setinv](/docs/setinv)

### Dyadic modifier

Set the [° un](/docs/un)\-compatible inverse of a function

The first function is the uninverted function, and the second function is the inverse.

```uiua
# Experimental!
F ← setinv(&p$"Forward _" .)(&p$"Backward _" .)
◌F   @A
◌°F  @B
◌⍜F∘ @C
```

```output
Forward A
Backward B
Forward C
Backward C

```
  
Unlike built-in functions, [setinv](/docs/setinv) cannot properly make inverses that save context for use in [⍜ under](/docs/under).

This can lead to errors if you are unaware of it.

```uiua
# Experimental!
F ← setinv+-
⍜F∘ 3 5
```

```output
Error: Stack was empty when evaluating argument 2
  at 2:12
2 | F ← setinv+-
               ─
Warning: setinv's functions must have opposite signatures, but their signatures are |2 and |2
  at 2:5
2 | F ← setinv+-
        ──────

```
  
For [⍜ under](/docs/under)\-compatible inverse defining, see [setund](/docs/setund).

</page>

<page url="https://www.uiua.org/docs/memo">

# [memo](/docs/memo)

### Monadic modifier

Memoize a function

If a function is [memo](/docs/memo)ized, then its results are cached.

Calling the function with the same arguments will return the cached result instead of recalculating it.

```uiua
F ← +⌊×10⚂
∵F [1 1 2 2 3 3]
```

```output
[6 5 6 2 8 8]
```

```uiua
F ← memo(+⌊×10⚂)
∵F [1 1 2 2 3 3]
```

```output
[3 3 3 3 4 4]
```

In general, this should only be used with functions that perform a potentially expensive calculation.

</page>

<page url="https://www.uiua.org/docs/complex">

# [ℂ complex](/docs/complex)

### Dyadic pervasive function

Make a complex number

The first argument is the imaginary part, and the second argument is the real part.

```uiua
ℂ 3 5
```

```output
5+3i
```

```uiua
ℂ [0 1 2] [3 4 5]
```

```output
[3 4+i 5+2i]
```

[ℂ complex](/docs/complex) is equivalent to [+](/docs/add)[×](/docs/multiply)`i`.

You can use [⌵ absolute value](/docs/absolute value) to get the magnitude of the complex number.

```uiua
⌵ ℂ3 4
```

```output
5
```

You can use [± sign](/docs/sign) to normalize the complex number to a magnitude of 1.

```uiua
± ℂ3 4
```

```output
0.8+0.6i
```

You can use [° un](/docs/un)[ℂ complex](/docs/complex) to get the imaginary and real parts back out.

```uiua
[°ℂ] i
```

```output
[1 0]
```

```uiua
[°ℂ] ×. ℂ3 4
```

```output
[24 7]
```

</page>

<page url="https://www.uiua.org/docs/rerank">

# [☇ rerank](/docs/rerank)

### Dyadic function

Change the rank of an array's rows

The resulting array will always have the given rank plus `1`.

```uiua
☇ 0 ↯2_3_3⇡18
☇ 1 ↯2_3_3⇡18
☇ 2 ↯2_3_3⇡18
```

```output
[0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17]
╭─          
╷  0  1  2  
   3  4  5  
   6  7  8  
   9 10 11  
  12 13 14  
  15 16 17  
           ╯
╭─          
╷  0  1  2  
╷  3  4  5  
   6  7  8  
            
   9 10 11  
  12 13 14  
  15 16 17  
           ╯
```

Ranks greater than the rank of the original rows will prepend `1` to the array's [△ shape](/docs/shape).

```uiua
☇ 2 [1 2 3 4]
```

```output
╭─         
╷          
╷ 1 2 3 4  
          ╯
```

```uiua
☇ 3 ↯2_3_3⇡18
☇ 4 ↯2_3_3⇡18
```

```output
╭─          
╷  0  1  2  
╷  3  4  5  
╷  6  7  8  
            
   9 10 11  
  12 13 14  
  15 16 17  
           ╯
╭─          
╷  0  1  2  
╷  3  4  5  
╷  6  7  8  
╷           
   9 10 11  
  12 13 14  
  15 16 17  
           ╯
```

Negative ranks are relative to the rank of the array.

```uiua
☇ ¯1 ↯2_3_3⇡18
☇ ¯2 ↯2_3_3⇡18
☇ ¯3 ↯2_3_3⇡18
```

```output
╭─          
╷  0  1  2  
╷  3  4  5  
   6  7  8  
            
   9 10 11  
  12 13 14  
  15 16 17  
           ╯
╭─          
╷  0  1  2  
   3  4  5  
   6  7  8  
   9 10 11  
  12 13 14  
  15 16 17  
           ╯
[0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17]
```
  
[⍜ under](/docs/under)[☇ rerank](/docs/rerank) will set the rank back when it is done.

```uiua
⍜(☇1)□ ↯2_3_3⇡18
```

```output
╓─          
╟  0  1  2  
╟  3  4  5  
   6  7  8  
            
   9 10 11  
  12 13 14  
  15 16 17  
           ╜
```

```uiua
⍜☇□  2 ↯2_3_3⇡18
```

```output
╓─          
╟  0  1  2  
╟  3  4  5  
   6  7  8  
            
   9 10 11  
  12 13 14  
  15 16 17  
           ╜
```

</page>

<page url="https://www.uiua.org/docs/&ru">

# [&ru](/docs/&ru) \- read until

### Dyadic function

Read from a stream until a delimiter is reached

Expects a delimiter and a stream handle.

The result will be a rank-`1` byte or character array. The type will match the type of the delimiter.

The stream handle `0` is stdin.

```uiua
&ru "Uiua" &fo "example.txt"
```

```output
"This is a simple text file for \nuse in example "
```

</page>

<page url="https://www.uiua.org/docs/&tcpl">

# [&tcpl](/docs/&tcpl) \- tcp - listen

### Monadic function

Create a TCP listener and bind it to an address

Use [&tcpa](/docs/&tcpa) on the returned handle to accept connections.
  
See also: [&tlsl](/docs/&tlsl)

</page>

<page url="https://www.uiua.org/docs/reverse">

# [⇌ reverse](/docs/reverse)

### Monadic function

Reverse the rows of an array

```uiua
⇌1_2_3_9
```

```output
[9 3 2 1]
```

```uiua
⇌[1_2 3_4 5_6]
```

```output
╭─     
╷ 5 6  
  3 4  
  1 2  
      ╯
```

[⇌ reverse](/docs/reverse) works through boxes.

```uiua
⇌ □[1 2 3]
```

```output
⟦3 2 1⟧
```

```uiua
≡⇌ {1_2_3_4 5_6_7 8_9}
```

```output
{[4 3 2 1] [7 6 5] [9 8]}
```

</page>

<page url="https://www.uiua.org/docs/select">

# [⊏ select](/docs/select)

### Dyadic function

Select multiple rows from an array

For a scalar selector, [⊏ select](/docs/select) is equivalent to [⊡ pick](/docs/pick).

```uiua
⊏ 2 [8 3 9 2 0]
⊡ 2 [8 3 9 2 0]
```

```output
9
9
```

For a rank `1` selector, [⊏ select](/docs/select) will pick multiple items from an array.

```uiua
⊏ 4_2 [8 3 9 2 0]
```

```output
[0 9]
```

```uiua
⊏ 0_2_1_1 [1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  7 8 9  
  4 5 6  
  4 5 6  
        ╯
```

If the selector's rank is [\>](/docs/greater than)`1`, then each row of the selector will be selected separately.

```uiua
⊏ [0_1 1_2 2_3] [2 3 5 7]
```

```output
╭─     
╷ 2 3  
  3 5  
  5 7  
      ╯
```

```uiua
⊏ [0_1 1_2 2_0] [1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
╷ 4 5 6  
         
  4 5 6  
  7 8 9  
         
  7 8 9  
  1 2 3  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/floor">

# [⌊ floor](/docs/floor)

### Monadic pervasive function

Round to the nearest integer towards `¯∞`

```uiua
⌊1.5
```

```output
1
```

```uiua
⌊¯1.5
```

```output
¯2
```

```uiua
⌊[1.5 ¯1.5 0.5 ¯0.5]
```

```output
[1 ¯2 0 ¯1]
```

</page>

<page url="https://www.uiua.org/docs/case">

# [case](/docs/case)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Call a pattern matching case

[case](/docs/case) calls its function and prevents errors from escaping a single [⍣ try](/docs/try).

Its primary use is in pattern matching.

Consider this function:

```uiua
F ← ⍣(
  ⊏3 °(⊂1)
| ⊏1 °(⊂2)
| 0
)
```

`F` attempts to [° un](/docs/un)`(`[⊂ join](/docs/join)`1)` from the input array. Failing that, it attempts to [° un](/docs/un)`(`[⊂ join](/docs/join)`2)`. In either [°](/docs/un)[⊂](/docs/join) case, we subsequently [⊏ select](/docs/select) from the array. If both pattern matches fail, it returns `0` as a default.

```uiua
F ← ⍣(
  ⊏3 °(⊂1)
| ⊏1 °(⊂2)
| 0
)
F [1 2 3 4 5]
F [2 3 4 5]
F [5 2 3]
```

```output
5
4
0
```

However, there is a problem with this code.

Pattern matching in a [⍣ try](/docs/try) works by throwing an error and passing the inputs to the next handler. However, if an error is thrown in a branch _after a successful pattern match_, the next branch will still be tried anyway.

This could lead to some unexpected behavior.

```uiua
F ← ⍣(
  ⊏3 °(⊂1)
| ⊏1 °(⊂2)
| 0
)
F [1 5 8]
```

```output
0
```

In the example above, we successfully [°](/docs/un)`(`[⊂](/docs/join)`1)`. However, the code after that pattern match fails. [⊏ select](/docs/select) errors because the index `3` is out of bounds of our array `[5 8]`. Instead of failing the whole function, the next branch is tried. It fails too, so we end up with `0`.

This could be especially problematic if the next branches have side-effects.

```uiua
F ← ⍣(
  ⊏3 &p"Matched 1!" °(⊂1)
| ⊏1 &p"Matched 2!" °(⊂2)
| 0  &p"Matched nothing!"
)
F [1 2 3 4]
```

```output
stdout:
Matched 1!
Matched nothing!

0
```

This prints 2 messages, even though the whole function should have failed.

Code that doesn't fail when it should can lead to bugs that are hard to track down.

We want our errors to be loud!
  
This is where [case](/docs/case) comes in. [case](/docs/case) has one special thing it does that makes it useful: errors returned from [case](/docs/case)'s first function can escape a single [⍣ try](/docs/try).

We can then arrange our [⍣ try](/docs/try) pattern matching with a [case](/docs/case) for each branch. The code in each branch that comes after the pattern match is wrapped in a [case](/docs/case).

```uiua
# Experimental!
F ← ⍣(
  case(⊏3) °(⊂1)
| case(⊏1) °(⊂2)
| 0
)
F [1 2 3 4]
```

```output
Error: Index 3 is out of bounds of length 3
  at 3:8
3 |   case(⊏3) °(⊂1)
           ─
  in fn from 3:7 at 3:3
  in fn from 3:3 at 2:5
```

And there we go. Task failed successfully!

</page>

<page url="https://www.uiua.org/docs/setund">

# [setund](/docs/setund)

### Triadic modifier

Set the [⍜ under](/docs/under)\-compatible inverse of a function

The first function will be called if the function is _outside_ an [⍜ under](/docs/under).

The second function will be called in the "do" part of an [⍜ under](/docs/under).

The third function will be called in the "undo" part of an [⍜ under](/docs/under).
  
Any outputs of the second function that excede the number of outputs of the first function will be popped and saved as _context_ after the "do" part of the [⍜ under](/docs/under). On the "undo" part, the context will be pushed onto the stack before calling the third function.
  
For example, here is a manual re-implementation of [+ add](/docs/add)'s [⍜ under](/docs/under) behavior. Note that the second function has 2 outputs. The extra output is saved as context.

```uiua
# Experimental!
F ← setund(+|⟜+|-)
⍜+(×10) 1 2
⍜F(×10) 1 2
```

```output
29
29
```
  
This example demonstrates the flow of input, output, and context.

```uiua
# Experimental!
F ← setund(
  &p$"Normal _".
| &p$"Do:   set ctx = _, value = _" ,, +1.
| &p$"Undo: get ctx = _, value = _" ⊙.
)
◌F 5
◌⍜F(×10) 5
```

```output
Normal 5
Do:   set ctx = 6, value = 5
Undo: get ctx = 6, value = 50

```
  
Inverses set with [setund](/docs/setund) cannot be used with [° un](/docs/un). For simpler inverse defining, see [setinv](/docs/setinv).

</page>

<page url="https://www.uiua.org/docs/format-config">

# Uiua Formatter Configuration 

You can configure Uiua's formatter by creating a file called `.fmt.ua` in the directory from which you run the interpreter. This configuration file is also a Uiua program. 

Configuration options are specified by binding values to specific names. 

Example with default values: 

```uiua
TrailingNewline ← 1
CommentSpaceAfterHash ← 1
MultilineIndent ← 2
CompactMultilineMode ← "auto"
MultilineCompactThreshold ← 10
AlignComments ← 1
IndentItemImports ← 1
```

The following configuration options are available: 

### TrailingNewline 

Type: boolean 

Default: `1`

Whether to add a trailing newline to the output. 

---

### CommentSpaceAfterHash 

Type: boolean 

Default: `1`

Whether to add a space after the `#` in comments. 

---

### MultilineIndent 

Type: natural number 

Default: `2`

The number of spaces to indent multiline arrays and functions 

---

### CompactMultilineMode 

Type: `"always"`, `"never"`, or `"auto"`

Default: `"auto"`

The mode for formatting multiline arrays and functions. 

* `"always"`: Always format multiline expressions in compact mode.
* `"never"`: Never format multiline expressions in compact mode.
* `"auto"`: Format multiline expressions in compact mode if they exceed `MultilineCompactThreshold`.

---

### MultilineCompactThreshold 

Type: natural number 

Default: `10`

The number of characters on line preceding a multiline array or function, at or before which the multiline will be compact. 

---

### AlignComments 

Type: boolean 

Default: `1`

Whether to align consecutive end-of-line comments 

---

### IndentItemImports 

Type: boolean 

Default: `1`

Whether to indent item imports 

---

</page>

<page url="https://www.uiua.org/docs/&p">

# [&p](/docs/&p) \- print with newline

### Monadic 0-output function

Print a value to stdout followed by a newline

</page>

<page url="https://www.uiua.org/docs/&fwa">

# [&fwa](/docs/&fwa) \- file - write all

### Dyadic 0-output function

Write the entire contents of an array to a file

Expects a path and a rank-`1` array of either numbers or characters.

The file will be created if it does not exist and overwritten if it does.
  
The editor on the website has a virtual filesystem. Files written with [&fwa](/docs/&fwa) can be read with [&fras](/docs/&fras) or [&frab](/docs/&frab).

```uiua
Path ← "test.txt"
&fwa Path +@A⇡26
&fras Path
```

```output
"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
```

</page>

<page url="https://www.uiua.org/docs/stack-idioms">

# Common Stack Idioms

This page contains some common stack idioms that you may find useful.

They are presented as rearrangements of characters which are then grouped into an array so that you can see the result.

```uiua
[. @A]
```

```output
"AA"
```

```uiua
[: @A@B]
```

```output
"BA"
```

```uiua
[, @A@B]
```

```output
"BAB"
```

```uiua
[◌ @A@B]
```

```output
Advice: An array of characters should instead be written as a string
  at 1:1
1 | [◌ @A@B]
    ────────

"B"

```

```uiua
[,, @A@B]
```

```output
"ABAB"
```

```uiua
[⟜: @A@B]
```

```output
"ABA"
```

```uiua
[⊙. @A@B]
```

```output
"ABB"
```

```uiua
[⊙.: @A@B]
```

```output
"BAA"
```

```uiua
[⊙◌ @A@B]
```

```output
"A"
```

```uiua
[⊙: @A@B@C]
```

```output
"ACB"
```

```uiua
[⊙, @A@B@C]
```

```output
"ACBC"
```

</page>

<page url="https://www.uiua.org/docs/&ime">

# [&ime](/docs/&ime) \- image - encode

### Dyadic function

Encode an image into a byte array with the specified format

The first argument is the format, and the second is the image.
  
The image must be a rank 2 or 3 numeric array.

Axes 0 and 1 contain the rows and columns of the image.

A rank 2 array is a grayscale image.

A rank 3 array is an RGB image.

In a rank 3 image array, the last axis must be length 1, 2, 3, or 4.

A length 1 last axis is a grayscale image.

A length 2 last axis is a grayscale image with an alpha channel.

A length 3 last axis is an RGB image.

A length 4 last axis is an RGB image with an alpha channel.
  
You can decode a byte array into an image with [° un](/docs/un)[&ime](/docs/&ime).
  
Supported formats are `jpg`, `png`, `bmp`, `gif`, `ico`, and `qoi`.
  
See also: [&ims](/docs/&ims)

</page>

<page url="https://www.uiua.org/docs/do">

# [⍢ do](/docs/do)

### Dyadic modifier

Repeat a function while a condition holds

The first function is the loop function, and it is run as long as the condition is true.

The second function is the condition. It's top return value must be a boolean.

```uiua
⍢(×2|<1000) 1
```

```output
1024
```

Return values from the condition function that are under the condition itself will be passed to the loop function.

Here is an example that evaluates a [Collatz sequence](https://en.wikipedia.org/wiki/Collatz%5Fconjecture).

The next number in the sequence is calculated in the condition function but [⊂ join](/docs/join)ed to the sequence in the loop function.

```uiua
C ← ⨬(+1×3|÷2)=0◿2.
◌⍢⊂(¬∊,,C⊢.) [7]
```

```output
[1 2 4 8 16 5 10 20 40 13 26 52 17 34 11 22 7]
```

If the condition function consumes its only arguments to evaluate the condition, then those arguments will be implicitly copied.

Consider this equivalence:

```uiua
⍢(×3|<100)  1
⍢(×3|<100.) 1
```

```output
243
243
```

The net stack change of the two functions, minus the condition, must be 0.

```uiua
⍢(×2.|<1000) 1
```

```output
Error: Do's functions cannot have a positive net stack change outside an array, but the composed signature of |1.2 and |1, minus the condition, is |1.2
  at 1:1
1 | ⍢(×2.|<1000) 1
    ─
```

This requirement is relaxed inside an array.

```uiua
[⍢(×2.|<1000)] 1
```

```output
[1024 512 256 128 64 32 16 8 4 2 1]
```

Alternatively, you can [⊂ join](/docs/join) the items to an initial list.

```uiua
◌⍢(⊃(×2)⊂|<100) 1 []
```

```output
[64 32 16 8 4 2 1]
```

</page>

<page url="https://www.uiua.org/docs/fft">

# [fft](/docs/fft)

### Monadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Run the Fast Fourier Transform on an array

The Fast Fourier Transform (FFT) is an optmized algorithm for computing the Discrete Fourier Transform (DFT). The DFT is a transformation that converts a signal from the time domain to the frequency domain.
  
The input array must be either real or complex.

The result will always be complex.

Multi-dimensional arrays are supported. Each rank-1 row is treated as a separate array.
  
In this example, we generate some data that is the sum of some [∿ sine](/docs/sine) waves.

We then run [fft](/docs/fft) on it and create a plot of the resulting frequency bins.

```uiua
# Experimental!
÷⟜⇡200             # 200 numbers between 0 and 1
/+∿⊞×[100 200 400] # Add some frequencies
⌵ fft              # Run the FFT
↘⌊÷2⧻.             # Drop the top half
⬚0≡▽:1 ×15         # Render
```
  
You can use [° un](/docs/un)[fft](/docs/fft) to calculate the inverse FFT.

In this example, we generate a list of `1`s representing frequency bins and run [°](/docs/un)[fft](/docs/fft) on it to get time-domain data. We can listen to the result as audio.

```uiua
# Experimental!
[220 277 330 440] # Frequencies
⬚0↙ &asr °⊚       # Put 1 in buffer for each frequency
◌°ℂ °fft          # Run inverse FFT and get the real part
```

</page>

<page url="https://www.uiua.org/docs/&cl">

# [&cl](/docs/&cl) \- close handle

### Monadic 0-output function

Close a stream by its handle

This will close files, tcp listeners, and tcp sockets.

</page>

<page url="https://www.uiua.org/docs/&cd">

# [&cd](/docs/&cd) \- change directory

### Monadic 0-output function

Change the current directory

</page>

<page url="https://www.uiua.org/docs/datetime">

# [datetime](/docs/datetime)

### Monadic function

Get the date and time information from a time

You can use [now](/docs/now) to get the current time in seconds since the Unix epoch.

[datetime](/docs/datetime) turns a time into an array with 6 numbers:

\- Year

\- Month (1-12)

\- Day (1-31)

\- Hour (0-23)

\- Minute (0-59)

\- Second (0-59)
  
```uiua
datetime now
```

```output
[2024 7 20 12 39 33]
```

The time is always in UTC.

[datetime](/docs/datetime) is semi-pervasive.

```uiua
datetime [1e8 1e9 1e10]
```

```output
╭─                     
╷ 1973  3  3  9 46 40  
  2001  9  9  1 46 40  
  2286 11 20 17 46 40  
                      ╯
```

You can format the time like this:

```uiua
datetime now         # Time
⍚(⬚@0↙¯⊙°⋕) [4....2] # Pad
°[°$"_-_-_ _:_:_"]   # Format
```

```output
"2024-07-20 12:39:33"
```
  
You can use [° un](/docs/un)[datetime](/docs/datetime) to convert an array back into a time.

An array with fewer than 6 numbers will be padded with zeros.

```uiua
°datetime [2023 2 28 1 2 3]
```

```output
1677546123
```

```uiua
°datetime [2014_4_1 2022_3_31]
```

```output
[1396310400 1648684800]
```

Invalid numbers in the datetime will be normalized.

```uiua
⍜°datetime∘ [2023 2 29]
```

```output
[2023 3 1 0 0 0]
```

```uiua
⍜°datetime∘ [1917 5 0]
```

```output
[1917 4 30 0 0 0]
```

```uiua
⍜°datetime∘ [1996 12 ¯100]
```

```output
[1996 8 22 0 0 0]
```

</page>

<page url="https://www.uiua.org/docs/modulus">

# [◿ modulus](/docs/modulus)

### Dyadic pervasive function

Modulo values

The second value is divided by the first, and the remainder is returned.

This is so you can think of `◿` `x` as a single unit.

```uiua
◿10 27
```

```output
7
```

```uiua
◿5 [3 7 14]
```

```output
[3 2 4]
```

```uiua
◿ [3 4 5] [10 10 10]
```

```output
[1 2 0]
```

</page>

<page url="https://www.uiua.org/docs/&camcap">

# [&camcap](/docs/&camcap) \- webcam - capture

### Monadic function

Capture an image from a webcam

Takes the index of the webcam to capture from.
  
Returnes a rank-3 numeric array representing the image.

</page>

<page url="https://www.uiua.org/tutorial/filesandstreams">

# Files and Streams 

Uiua has support for reading and writing files from the filesystem. It has helper functions for reading and writing entire files, as well as a stream abstraction for processing files in chunks. This stream abstraction extends to other input/output sources, such as network sockets. 

## [Reading and Writing Entire Files ](#reading-and-writing-entire-files)

Loading an entire file into an array is very simple. For demonstration purposes, this website has a built-in file called `example.txt` that we will work with. 

We can read an entire file as a string with [&fras](/docs/&fras) (file read all string). 

```uiua
&fras "example.txt"
```

```output
"This is a simple text file for \nuse in example Uiua code ✨"
```

If we instead want to read the file into an array of bytes, we can use [&frab](/docs/&frab) (file read all bytes). 

```uiua
&frab "example.txt"
```

```output
[84 104 105 115 32 105 115 32 97 32 115 105 109 112 108 101 32 116 101 120 116 32 102 105 108 101 32 102 111 114 32 10 117 115 101 32 105 110 32 101 120 97 109 112 108 101 32 85 105 117 97 32 99 111 100 101 32 226 156 168]
```

To write an entire array to a file, we can use [&fwa](/docs/&fwa) (file write all). The type of the array determines whether the file is written as text or binary. 

```uiua
&fwa "file.txt" "Hello, world!"
```

Each editor on this site has a virtual file system, which means that we can read from files after they have been written to. This is useful for testing file writing functions. 

```uiua
&fwa "file.bin" ⇡10
&frab "file.bin"
```

```output
[0 1 2 3 4 5 6 7 8 9]
```

## [Streams ](#streams)

Stream are an abstraction for sending and receiving data in chunks from some source. Similar concepts exist in many programming languages, inluding Uiua. 

In this tutorial, we will focus on using streams to interact with files. However, Uiua also uses streams for other input/output sources, particularly network sockets. 

## [Reading Streams ](#reading-streams)

Streams in Uiua are passed around as _handles_  \- boxed integer values that can be used to look up the stream in the interpreter. Functions that create streams return these handles, and they attach some metadata about what kind of stream it is for debugging purposes. 

We can use [&fo](/docs/&fo) (file open) to open a file for reading. This function returns a stream handle. 

```uiua
&fo "example.txt"
```

```output
file example.txt(□3)
```

There are a few functions for reading from streams. The most basic two are [&rs](/docs/&rs) (read string) and [&rb](/docs/&rb) (read bytes). These functions read at most a certain number of bytes from the stream and return them as a character or byte array, respectively. 

Here, we open a file with [&fo](/docs/&fo) and then read 10 bytes from it. [&rb](/docs/&rb) simply puts the bytes in an array, while [&rs](/docs/&rs) converts them to a string. 

```uiua
&rb 10 &fo "example.txt"
&rs 10 &fo "example.txt"
```

```output
[84 104 105 115 32 105 115 32 97 32]
"This is a "
```

If we pass [∞ infinity](/docs/infinity) as the number of bytes to read, the stream will read until the end of the file. This is functionally equivalent to [&fras](/docs/&fras) or [&frab](/docs/&frab). 

```uiua
&rs ∞ &fo "example.txt"
```

```output
"This is a simple text file for \nuse in example Uiua code ✨"
```

If we want to read up until some delimiter, we can use [&ru](/docs/&ru) (read until). This function reads from the stream until it encounters a certain sequence of characters or bytes, and returns everything up to that point. If the delimiter is not found, the function will read until the end of the stream. 

```uiua
&ru "file" &fo "example.txt"
```

```output
"This is a simple text "
```

In general, you only need to use streams to read from a file if the file is too large to fit in memory. For most use cases, [&fras](/docs/&fras) and [&frab](/docs/&frab) are sufficient. 

## [Writing Streams ](#writing-streams)

The [&w](/docs/&w) (write) function writes a character or byte array to a stream. It takes the data to write and the stream handle as arguments. 

```uiua
&w "Hello, world!" &fc "file.txt"
```

But wait, if we try to read from the file now, it is empty! 

```uiua
&w "Hello, world!" &fc "file.txt"
&fras "file.txt"
```

```output
""
```

This is because the writes we have made have not been flushed to the file. Streams should always be closed with [&cl](/docs/&cl) (close) when they are no longer needed. This will flush any remaining writes to the file and close the file handle. 

```uiua
&cl &w "Hello, world!" . &fc "file.txt"
&fras "file.txt"
```

```output
"Hello, world!"
```

Knowing this, we see that the examples in the section above are actually incorrect! We should close the file even after reading from it. 

[⍜ under](/docs/under) can help here. It will automatically close the stream with [&cl](/docs/&cl) after the block of code is executed. 

```uiua
⍜(&fc "file.txt"|&w "Hello, world!")
&fras "file.txt"
```

```output
"Hello, world!"
```

</page>

<page url="https://www.uiua.org/docs/partition">

# [⊜ partition](/docs/partition)

### Monadic 2-argument modifier

Group sequential sections of an array

The most common use of [⊜ partition](/docs/partition) is to split an array by a delimiter.
  
Takes a function and two arrays.

The arrays must be the same [⧻ length](/docs/length).

The first array is called the "markers". It must be rank `1` and contain integers.

Consecutive rows in the second array that line up with groups of the same key in the markers will be grouped together.

Keys [≤](/docs/less or equal)`0` will be omitted.

The function then processes each group in order. The result depends on what the function is.

If the function takes 0 or 1 arguments, then [⊜ partition](/docs/partition) behaves like [≡ rows](/docs/rows). This is called _iterating_ [⊜ partition](/docs/partition).

```uiua
⊜∘ [0 0 2 2 1 1 3 3] [1 2 3 4 5 6 7 8]
```

```output
╭─     
╷ 3 4  
  5 6  
  7 8  
      ╯
```

If the function takes 2 or more arguments, then [⊜ partition](/docs/partition) behaves like [/ reduce](/docs/reduce). This is called _reducing_ [⊜ partition](/docs/partition).

```uiua
⊜⊂ [0 0 2 2 1 1 3 3] [1 2 3 4 5 6 7 8]
```

```output
[3 4 5 6 7 8]
```

If the values returned by the function do not have the same [△ shape](/docs/shape), concatenation will fail.

```uiua
⊜∘ [0 2 3 3 3 0 1 1] [1 2 3 4 5 6 7 8]
```

```output
Error: Cannot couple arrays with shapes [1] and [3]
  at 1:1
1 | ⊜∘ [0 2 3 3 3 0 1 1] [1 2 3 4 5 6 7 8]
    ─
```

It is common to use [□ box](/docs/box) to encapsulate groups of different [△ shape](/docs/shape)s.

```uiua
⊜□ [0 2 3 3 3 0 1 1] [1 2 3 4 5 6 7 8]
```

```output
{[2] [3 4 5] [7 8]}
```
  
This can be used to split an array by a delimiter.

```uiua
⊜□ ≠@ . $ Hey there friendo
```

```output
{"Hey" "there" "friendo"}
```

You can nest [⊜ partition](/docs/partition)s to split by multiple delimiters and create a multi-dimensional array.

```uiua
$ 1 1 2 3
$ 5 8 13 21
⊜(⊜⋕≠@ .)≠@\n.
```

```output
╭─           
╷ 1 1  2  3  
  5 8 13 21  
            ╯
```
  
[⊜ partition](/docs/partition) also works with multidimensional markers. Groups are formed from markers that are adjacent along any axis.

Each group will be flattened before being passed to the function.

```uiua
⊜□.. ↯4_4 [0 1 1 2 2]
```

```output
╭─         
╷ 0 1 1 2  
  2 0 1 1  
  2 2 0 1  
  1 2 2 0  
          ╯
{[1 1 1 1 1] [2] [2 2 2 2 2] [1]}
```

If we wanted to group the indices that are adjacent, we could use the array to [⊜ partition](/docs/partition) its own indices.

```uiua
⊜□:⇡△.. ↯4_4 [0 1 1 2 2]
```

```output
╭─         
╷ 0 1 1 2  
  2 0 1 1  
  2 2 0 1  
  1 2 2 0  
          ╯
╭─                                 
  ╓─              ╓─               
  ╟ 0 1           ╟ 1 0            
    0 2   ╓─        2 0   ╓─       
    1 2   ╟ 0 3     2 1   ╟ 3 0    
    1 3         ╜   3 1         ╜  
    2 3             3 2            
        ╜               ╜          
                                  ╯
```
  
[⍜ under](/docs/under)[⊜ partition](/docs/partition) works if [⊜ partition](/docs/partition)'s function is [⍜ under](/docs/under)able.

```uiua
⍜⊜□⇌  ≠@ . $ These are some words
```

```output
"words some are These"
```

```uiua
⍜⊜□≡⇌ ≠@ . $ These are some words
```

```output
"esehT era emos sdrow"
```

```uiua
⍜⊜⊢⌵  ≠@ . $ These are some words
```

```output
"These Are Some Words"
```
  
[⊜ partition](/docs/partition) is closely related to [⊕ group](/docs/group).

</page>

<page url="https://www.uiua.org/docs/&fde">

# [&fde](/docs/&fde) \- file - delete

### Monadic 0-output function

Delete a file or directory

```uiua
&fde "example.txt"
```

Deletes the file or directory at the given path.

Be careful with this function, as deleted files and directories cannot be recovered!

For a safer alternative, see [&ftr](/docs/&ftr).

</page>

<page url="https://www.uiua.org/tutorial/thinkingwitharrays">

# Thinking with Arrays

So far, we've covered the mechanics of working with arrays in Uiua. However, if you are new to the array paradigm, it may not be clear how to use arrays to solve problems.

This section covers some of the common functions and modifiers that pop up when solving many different problems.

## [Masks and ](#masks-and-keep)[▽ keep](/docs/keep)

Many languages have some sort of `filter` function that takes a predicate and a list and returns a list of all the elements that satisfy the predicate. In array languages, we take a different approach.

First, we create a _mask_ array. A mask array is an array of `0`s and `1`s where `1`s represent the rows that satisfy the predicate. For pervasive functions, this is extremely simple.

For example, if we wanted to create a mask of all numbers greater that 4, we simply treat the whole array as a single unit.

```uiua
>4. [2 8 3 9 1 7 2]
```

```output
[2 8 3 9 1 7 2]
[0 1 0 1 0 1 0]
```

The [▽ keep](/docs/keep) function takes a mask array and an array and returns an array of all the rows that have a `1` in the mask. This is essentially a filter.

```uiua
▽ >4. [2 8 3 9 1 7 2]
```

```output
[8 9 7]
```

[▽ keep](/docs/keep) also works with [⍜ under](/docs/under) so that you can modify the rows that have a `1` in the mask.

```uiua
⍜▽(×10) >4. [2 8 3 9 1 7 2]
```

```output
[2 80 3 90 1 70 2]
```

[▽ keep](/docs/keep) has a few other use cases with non-masks. See its documentation for more.

## [](#where)[⊚ where](/docs/where)

The [⊚ where](/docs/where) function converts a mask array into an array of indices where the mask is `1`.

```uiua
⊚. >4. [2 8 3 9 1 7 2]
```

```output
[2 8 3 9 1 7 2]
[0 1 0 1 0 1 0]
[1 3 5]
```

This works with multi-dimensional arrays as well.

```uiua
⊚. >4. [2_8_3 9_1_7]
```

```output
╭─       
╷ 2 8 3  
  9 1 7  
        ╯
╭─       
╷ 0 1 0  
  1 0 1  
        ╯
╭─     
╷ 0 1  
  1 0  
  1 2  
      ╯
```

[° un](/docs/un)[⊚ where](/docs/where) converts an array of indices into a mask array.

```uiua
°⊚ [3 9 5 8]
```

```output
[0 0 0 1 0 1 0 0 1 1]
```

```uiua
°⊚ [1_2 3_4]
```

```output
╭─           
╷ 0 0 0 0 0  
  0 0 1 0 0  
  0 0 0 0 0  
  0 0 0 0 1  
            ╯
```

[⊏ select](/docs/select)[⊚ where](/docs/where) is equivalent to [▽ keep](/docs/keep) (at least for boolean predicates).

```uiua
⊏⊚ =0◿2. [2 8 3 9 1 7 2]
```

```output
[2 8 2]
```

```uiua
▽  =0◿2. [2 8 3 9 1 7 2]
```

```output
[2 8 2]
```

## [](#scan)[\\ scan](/docs/scan)

The [\\ scan](/docs/scan) modifier is similar to [/ reduce](/docs/reduce), but it returns an array of all the intermediate results.

```uiua
/+ [1 2 3 4]
\+ [1 2 3 4]
```

```output
10
[1 3 6 10]
```

This can be useful when used on a mask.

For example, if we wanted to get the first word of a string, we could start by creating a mask of all the non-space characters.

Then we can use [\\ scan](/docs/scan)[× multiply](/docs/multiply) to zero the mask after the first word.

Finally, we can use [▽ keep](/docs/keep) to apply the mask and get the first word.

Use the arrows to see how the mask changes.

```uiua
▽ \× ≠@ . "What's the first word?"
```

```output
"What's"
```

## [](#fill)[⬚ fill](/docs/fill)

Recall that the [⬚ fill](/docs/fill) modifier sets a "fill value" that can be used by certain functions.

One common use is to set a default value that will be used when the shapes of arrays do not match.

```uiua
⬚0+ 10_20 3_4_5_6
```

```output
[13 24 5 6]
```

For example, if you wanted to logical OR two masks with different shapes, you could use [⬚ fill](/docs/fill) with a different fill value depending on what you want to do with the mismatched parts.

```uiua
⬚0↥ 1_0_0_1_0 0_1_0
⬚1↥ 1_0_0_1_0 0_1_0
```

```output
[1 1 0 1 0]
[1 1 0 1 1]
```

Another interesting use is a [⬚ fill](/docs/fill)ed [↻ rotate](/docs/rotate). Instead of wrapping values around, it fills in one side of the array with the fill value.

```uiua
  ↻¯2 [1 2 3 4 5]
⬚0↻¯2 [1 2 3 4 5]
```

```output
[4 5 1 2 3]
[0 0 1 2 3]
```

## [](#partition)[⊜ partition](/docs/partition)

[⊜ partition](/docs/partition) is a powerful modifier that splits up an array based on a list of consecutive keys. Before explaining it further, let's look at a simple example of a very common use case: splitting a string into words.

```uiua
⊜□ ≠@ . "Look at that!"
```

```output
{"Look" "at" "that!"}
```

First, we create a mask of all the non-space characters. Then, [⊜ partition](/docs/partition) calls [□ box](/docs/box) on each section of the string that corresponds to a run of `1`s in the mask.

Here is another example using [⊜ partition](/docs/partition)[□ box](/docs/box) with the inputs explicitly defined.

```uiua
[1 2 3 4 5 6 7 8]
[1 1 0 5 6 6 0 1]
⊜□
```

```output
{[1 2] [4] [5 6] [8]}
```

Notice that `0`s in the keys array cause the corresponding sections of the input array to be skipped, so `3` and `7` are omitted from the output.

We use [□ box](/docs/box) here because the resulting sections have different lengths. If we expect the sections to have the same lengths, we can use [∘ identity](/docs/identity) instead.

```uiua
[1 2 3 4 5 6 7 8]
[1 1 2 2 0 0 3 3]
⊜∘
```

```output
╭─     
╷ 1 2  
  3 4  
  7 8  
      ╯
```

[⊜ partition](/docs/partition) is very useful when working with strings. See the [Strings tutorial](/tutorial/strings) for more.

A hint for one of the challenges below: [⊜ partition](/docs/partition) works with [⍜ under](/docs/under)!

</page>

<page url="https://www.uiua.org/docs/not%20equals">

# [≠ not equals](/docs/not equals)

### Dyadic pervasive function

Compare for inequality

Formats from `!=`.
  
```uiua
≠1 2
```

```output
1
```

```uiua
≠5 5
```

```output
0
```

```uiua
≠1 [1 2 3]
```

```output
[0 1 1]
```

```uiua
≠ [1 2 2] [1 2 3]
```

```output
[0 0 1]
```

</page>

<page url="https://www.uiua.org/docs/&imd">

# [&imd](/docs/&imd) \- image - decode

### Monadic 2-output function

Decode an image from a byte array

Returns the image format as a string and a rank-`3` numeric array.

Supported formats are `jpg`, `png`, `bmp`, `gif`, `ico`, and `qoi`.
  
See also: [&ime](/docs/&ime)

</page>

<page url="https://www.uiua.org/docs/&fif">

# [&fif](/docs/&fif) \- file - is file

### Monadic function

Check if a path is a file

```uiua
&fif "example.txt"
```

```output
1
```

</page>

<page url="https://www.uiua.org/docs/tag">

# [tag](/docs/tag)

### Noadic function

Generate a unique tag

Tags are just numbers and are unique across multiple threads, but not across multiple runs.

```uiua
[⍥tag5]
[⍥tag5]
```

```output
[14 13 12 11 10]
[19 18 17 16 15]
```

</page>

<page url="https://www.uiua.org/docs/fix">

# [¤ fix](/docs/fix)

### Monadic function

Add a length-1 axis to an array

```uiua
¤5
```

```output
[5]
```

```uiua
¤¤5
```

```output
╭─   
╷ 5  
    ╯
```

```uiua
¤[1 2 3]
```

```output
╭─       
╷ 1 2 3  
        ╯
```

```uiua
¤¤[1 2 3]
```

```output
╭─       
╷        
╷ 1 2 3  
        ╯
```

This is useful when combine with [≡ rows](/docs/rows) or [⊞ table](/docs/table) to re-use an entire array for each row of others.

```uiua
≡⊂ ¤ 1_2_3 4_5_6
```

```output
╭─         
╷ 1 2 3 4  
  1 2 3 5  
  1 2 3 6  
          ╯
```

[¤ fix](/docs/fix) can also be used with pervasive dyadic functions.

```uiua
-  [1 2 3]  [4 5 6]
- ¤[1 2 3]  [4 5 6]
-  [1 2 3] ¤[4 5 6]
```

```output
[3 3 3]
╭─       
╷ 3 2 1  
  4 3 2  
  5 4 3  
        ╯
╭─       
╷ 3 4 5  
  2 3 4  
  1 2 3  
        ╯
```

```uiua
-  1_3 [3_4 5_6 7_8]
```

```output
Error: Shapes [2] and [3 × 2] do not match
  at 1:1
1 | -  1_3 [3_4 5_6 7_8]
    ─
```

```uiua
- ¤1_3 [3_4 5_6 7_8]
```

```output
╭─     
╷ 2 1  
  4 3  
  6 5  
      ╯
```

[¤ fix](/docs/fix)'s name come from the way it "fixes" an array in this way.

See the [Advanced Array Manipulation Tutorial](/tutorial/advancedarray) for more information on this use case.

</page>

<page url="https://www.uiua.org/docs/orient">

# [⮌ orient](/docs/orient)

### Dyadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Change the order of the axes of an array

The first argument is a list of unique axis indices.

The corresponding axes of the array will be moved to the front of the array's shape.

Positive indices start from the leading axis. Negative indices start from the trailing axis.

```uiua
# Experimental!
°△ 2_3_4
⮌ 1 .
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
╭─             
╷  0  1  2  3  
╷ 12 13 14 15  
               
   4  5  6  7  
  16 17 18 19  
               
   8  9 10 11  
  20 21 22 23  
              ╯
```

```uiua
# Experimental!
△ ⮌ 2_1 °△ 2_3_4_5
```

```output
[4 3 2 5]
```

[⮌ orient](/docs/orient)`¯1` is equivalent to [° un](/docs/un)[⍉ transpose](/docs/transpose).

```uiua
# Experimental!
°△ 2_3_4
∩△ ⊃°⍉(⮌¯1)
```

```output
[4 2 3]
[4 2 3]
```

Currently, all uses of [⮌ orient](/docs/orient) can be written with sequences of [⍉ transpose](/docs/transpose) and [≡ rows](/docs/rows).

</page>

<page url="https://www.uiua.org/docs/stack">

# [? stack](/docs/stack)

### Noadic 0-output function

Debug print all stack values without popping them

This is equivalent to [dump](/docs/dump)[∘ identity](/docs/identity), but is easier to type.
  
This is useful when you want to inspect the current ordering of the stack.

For example, if you are juggling some values on the stack, you can use [? stack](/docs/stack) to inspect the stack afterwards:

```uiua
1 2 3
,,⊙.:
?
+×-×+
```

```output
┌╴? 3:1
├╴3
├╴1
├╴1
├╴2
├╴1
├╴2
└╴╴╴╴╴╴

¯2
```

```uiua
2_3_10 ? 17 ↯3_4⇡12
++
```

```output
┌╴? 1:8
│ ╭─           
├╴╷ 0 1  2  3  
│   4 5  6  7  
│   8 9 10 11  
│             ╯
├╴17
└╴╴╴╴╴╴

╭─             
╷ 19 20 21 22  
  24 25 26 27  
  35 36 37 38  
              ╯
```

</page>

<page url="https://www.uiua.org/docs/optimizations">

# Optimizations

The Uiua interpreter contains a number of optimizations that you can take advantage of to improve the performance of your code.

## [Pervasive Functions](#pervasive-functions)

All pervasive functions run on arrays in hot loops that should have performance comparable to an implementation in a languages like C or Rust. This includes all mathematical and comparison functions.

The interpreter does its best to re-use allocated memory when possible instead of copying. Arrays are reference-counted, so an array's memory is only copied when it is modified _and_ a duplicate exists somewhere. [. duplicate](/docs/duplicate) and [, over](/docs/over) do not copy actual array memory. They only copy pointers and increment reference counts.

In this example, only the last line results in a copy:

```uiua
+1 ⇡10
×. ⇡10
×+1⇡10⇡10
+1.⇡10
```

Using pervasive functions whenever possible, on the largest arrays possible, is the best way to get good performance out of Uiua.

## [Iterating Modifiers](#iterating-modifiers)

The modifiers [/ reduce](/docs/reduce), [\\ scan](/docs/scan), and [⊞ table](/docs/table) have special-case optimizations when used with certain functions. These optimizations eliminate all interpreter overhead while the loops are running, and are therefore very fast.

This table shows which combinations are optimized:

| [+](/docs/add)[\-](/docs/subtract)[×](/docs/multiply)[÷](/docs/divide)[◿](/docs/modulus)[∠](/docs/atangent)[↧](/docs/minimum)[↥](/docs/maximum) | [\=](/docs/equals)[≠](/docs/not equals) | [<](/docs/less than)[≤](/docs/less or equal)[\>](/docs/greater than)[≥](/docs/greater or equal) | [⊂](/docs/join) | [⊟](/docs/couple)[ℂ](/docs/complex) |   |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------- | ----------------------------------- | - |
| [⊞ table](/docs/table)                                                                                                                          | ✔                                       | ✔                                                                                               | ✔               | ✔                                   | ✔ |
| [/ reduce](/docs/reduce)                                                                                                                        | ✔                                       | ✔                                                                                               |                 |                                     |   |
| [\\ scan](/docs/scan)                                                                                                                           | ✔                                       | ✔                                                                                               |                 |                                     |   |

The pattern [/](/docs/reduce)`F`[⊞](/docs/table)`G` is optimized to use much less memory and run much faster than the naive implementation. This only occurs when both functions have signature `|2.1`. Rather than creating the entire table and then reducing it, each reduced row is generated as it is needed.

On top of this, particular combinations of `F` and `G` are optimized to eliminate all interpreter overhead. All combinations of the following functions are optimized:

| [/ reduce](/docs/reduce) | [+](/docs/add)[×](/docs/multiply)[↧](/docs/minimum)[↥](/docs/maximum)                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [⊞ table](/docs/table)   | [+](/docs/add)[\-](/docs/subtract)[×](/docs/multiply)[÷](/docs/divide)[◿](/docs/modulus)[∠](/docs/atangent)[\=](/docs/equals)[≠](/docs/not equals)[<](/docs/less than)[≤](/docs/less or equal)[\>](/docs/greater than)[≥](/docs/greater or equal)[↧](/docs/minimum)[↥](/docs/maximum)[ℂ](/docs/complex)[⊂](/docs/join)[⊟](/docs/couple) |

## [](#rows)[≡ rows](/docs/rows)

When used inside [≡ rows](/docs/rows), some functions have special-case implementations that operate on the whole array at once. This avoids the interpreter overhead inherent to [≡ rows](/docs/rows).

In addition to all pervasive functions, the following functions are optimized when used inside [≡ rows](/docs/rows):

| [♭ deshape](/docs/deshape)     |
| ------------------------------ |
| [⇌ reverse](/docs/reverse)     |
| [⍉ transpose](/docs/transpose) |
| [⊛ classify](/docs/classify)   |
| [¤ fix](/docs/fix)             |
| [□ box](/docs/box)             |

| [⋅ gap](/docs/gap)[⚂ random](/docs/random)                                                           |
| ---------------------------------------------------------------------------------------------------- |
| [⋅ gap](/docs/gap)constant                                                                           |
| [⊏](/docs/select)[⍏](/docs/rise)[.](/docs/duplicate) / [⊏](/docs/select)[⊸](/docs/by)[⍏](/docs/rise) |
| [⊏](/docs/select)[⍖](/docs/fall)[.](/docs/duplicate) / [⊏](/docs/select)[⊸](/docs/by)[⍖](/docs/fall) |
| [° un](/docs/un)[⊟ couple](/docs/couple)                                                             |
| [° un](/docs/un)[⊂ join](/docs/join)                                                                 |
| [↻ rotate](/docs/rotate)                                                                             |

This optimization applies not just to [≡ rows](/docs/rows), but also [∵ each](/docs/each), [≡](/docs/rows)[≡](/docs/rows), [≡](/docs/rows)[≡](/docs/rows)[≡](/docs/rows), etc.

## [Complexity](#complexity)

Some combinations of functions are special-cased in the interpreter to run in less time complexity or in fewer operations than is implied by each function individually.

This table shows how various combinations of functions are optimized:

| Functions                                                                                            | Naive Implementation                                                   | Optimized Implementation              |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------- |
| [⊢](/docs/first)[⇌](/docs/reverse)                                                                   | O(n)                                                                   | O(1)                                  |
| [⊢](/docs/first)[⍏](/docs/rise)                                                                      | O(nlogn)                                                               | O(n)                                  |
| [⊢](/docs/first)[⇌](/docs/reverse)[⍏](/docs/rise)                                                    | O(nlogn)                                                               | O(n)                                  |
| [⊢](/docs/first)[⍖](/docs/fall)                                                                      | O(nlogn)                                                               | O(n)                                  |
| [⊢](/docs/first)[⇌](/docs/reverse)[⍖](/docs/fall)                                                    | O(nlogn)                                                               | O(n)                                  |
| [⊢](/docs/first)[⊚](/docs/where)                                                                     | O(n)                                                                   | Stop at first non-zero from front     |
| [⊢](/docs/first)[⇌](/docs/reverse)[⊚](/docs/where)                                                   | O(n)                                                                   | Stop at first non-zero from back      |
| [⊏](/docs/select)[⍏](/docs/rise)[.](/docs/duplicate) / [⊏](/docs/select)[⊸](/docs/by)[⍏](/docs/rise) | Create intermediate [⍏ rise](/docs/rise) array                         | Just sort                             |
| [⊏](/docs/select)[⍖](/docs/fall)[.](/docs/duplicate) / [⊏](/docs/select)[⊸](/docs/by)[⍖](/docs/fall) | Create intermediate [⍖ fall](/docs/fall) array                         | Just sort                             |
| [⊙](/docs/dip)[⊙](/docs/dip)[⊙](/docs/dip)…                                                          | [⊙ dip](/docs/dip) n times                                             | Single [⊙ dip](/docs/dip) of n values |
| [⍉](/docs/transpose)[⍉](/docs/transpose)[⍉](/docs/transpose)…                                        | [⍉ transpose](/docs/transpose) n times                                 | Single [⍉ transpose](/docs/transpose) |
| [≡](/docs/rows)[/](/docs/reduce)F[◫](/docs/windows)                                                  | Make [◫ windows](/docs/windows) then [/ reduce](/docs/reduce) each row | Apply F to adjacent rows              |
| [≡](/docs/rows)[□](/docs/box)[◫](/docs/windows)                                                      | Make [◫ windows](/docs/windows) then [□ box](/docs/box) each row       | [□ box](/docs/box) each window        |
| [⧻](/docs/length)[⊚](/docs/where)                                                                    | Make [⊚ where](/docs/where) then get [⧻ length](/docs/length)          | Just count                            |
| [≡](/docs/rows)[/](/docs/reduce)F                                                                    | [/ reduce](/docs/reduce) each row                                      | [/ reduce](/docs/reduce) each column  |

## [Other Optimizations](#other-optimizations)

* [≡ rows](/docs/rows), [∵ each](/docs/each), [⊞ table](/docs/table), [⊕ group](/docs/group), [⊜ partition](/docs/partition), and [⍚ inventory](/docs/inventory) are all optimized when a [⊃ fork](/docs/fork) or [⊓ bracket](/docs/bracket) is at the top level of their function. For example, [⊞](/docs/table)[⊃](/docs/fork)`F` `G` is optimized to [⊃](/docs/fork)[⊞](/docs/table)`F`[⊞](/docs/table)`G`.
* [⊕ group](/docs/group) and [⊜ partition](/docs/partition) are optimized to be fast with [⧻ length](/docs/length), [⊢ first](/docs/first), [⊢](/docs/first)[⇌](/docs/reverse), [⊙](/docs/dip)[◌](/docs/pop), and [⋅](/docs/gap)[∘](/docs/identity).

</page>

<page url="https://www.uiua.org/docs/reduce">

# [/ reduce](/docs/reduce)

### Monadic modifier

Apply a reducing function to an array

For reducing with an initial value, see [∧ fold](/docs/fold).
  
[/](/docs/reduce)[+](/docs/add) sums the rows of an array.

```uiua
/+ 1_2_3_4_5
```

```output
15
```

[/ reduce](/docs/reduce) goes from left to right. This is important for non-commutative functions like [\- subtract](/docs/subtract).

```uiua
/- 1_2_3_4_5
```

```output
3
```

[/ reduce](/docs/reduce) works on arrays of arbitrary rank. The leading-axis rows will always be iterated over.

```uiua
/+ . [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
[5 7 9]
```

```uiua
/+ . [[0_1 1_0] [2_0 0_0] [0_0 0_3]]
```

```output
╭─     
╷ 0 1  
╷ 1 0  
       
  2 0  
  0 0  
       
  0 0  
  0 3  
      ╯
╭─     
╷ 2 1  
  1 3  
      ╯
```
  
If you want to see the intermediate values, you can use [\\ scan](/docs/scan).

```uiua
/- 1_2_3_4_5
\- 1_2_3_4_5
```

```output
3
[1 1 2 2 3]
```
  
You can can reduce with arbitrary functions.

```uiua
/(×+1) 1_2_3_4_5
```

```output
325
```
  
[/ reduce](/docs/reduce)[⊂ join](/docs/join) is the simplest way to combine the first two dimensions of an array.

It is optimized in the interpreter to be very fast.

```uiua
/⊂ .↯2_2_4⇡16
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
               
   8  9 10 11  
  12 13 14 15  
              ╯
╭─             
╷  0  1  2  3  
   4  5  6  7  
   8  9 10 11  
  12 13 14 15  
              ╯
```
  
Some functions have default values if the array is empty.

Functions without default values will throw an error if the array is empty.

```uiua
/+ []
```

```output
0
```

```uiua
/× []
```

```output
1
```

```uiua
/↥ []
```

```output
¯∞
```

```uiua
/↧ []
```

```output
∞
```

```uiua
/∠ []
```

```output
0
```

```uiua
/⊡ []
```

```output
Error: Cannot / reduce empty array. Function has no identity value.
  at 1:1
1 | /⊡ []
    ─
```
  
An initial value can be set with [⬚ fill](/docs/fill).

```uiua
  /↥ []
```

```output
¯∞
```

```uiua
⬚5/↥ []
```

```output
5
```

```uiua
  /↥ [1 2 3]
```

```output
3
```

```uiua
⬚5/↥ [1 2 3]
```

```output
5
```
  
If the function takes more than 2 arguments, additional arguments above the array on the stack will be passed to the function on every iteration. This is useful for things like interspersing one array between the rows of another.

```uiua
/(⊂⊂) 0_1 [2 3 4 5]
```

```output
[2 0 1 3 0 1 4 0 1 5]
```

```uiua
/◇(⊂⊂) @, {"cat" "bird" "dog"}
```

```output
"cat,bird,dog"
```

</page>

<page url="https://www.uiua.org/docs/coordinate">

# [⟔ coordinate](/docs/coordinate)

### Dyadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Find the first deep index of one array in another

While [⊗ indexof](/docs/indexof) returns an array of top-level indices into the searched-in array, [⟔ coordinate](/docs/coordinate) returns an array of multi-dimensional coordinates.

```uiua
# Experimental!
⟔,, 14 ↯2_3_4⇡24
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 2:1
2 | ⟔,, 14 ↯2_3_4⇡24
    ─

╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
14
[1 0 2]

```

```uiua
# Experimental!
⟔,, [4 5 6 7] ↯2_3_4⇡24
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 2:1
2 | ⟔,, [4 5 6 7] ↯2_3_4⇡24
    ─

╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
[4 5 6 7]
[0 1]

```

```uiua
# Experimental!
⟔,, +12↯3_4⇡12 ↯2_3_4⇡24
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 2:1
2 | ⟔,, +12↯3_4⇡12 ↯2_3_4⇡24
    ─

╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
╭─             
╷ 12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
1

```

```uiua
# Experimental!
⟔,, [1 2 3] [2 1 4 5 3]
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 2:1
2 | ⟔,, [1 2 3] [2 1 4 5 3]
    ─

[2 1 4 5 3]
[1 2 3]
╭─   
╷ 1  
  0  
  4  
    ╯

```

If the index cannot be found, the [△ shape](/docs/shape) of the searched-in array is returned.

```uiua
# Experimental!
⟔,, 100 ↯2_3_4⇡24
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 2:1
2 | ⟔,, 100 ↯2_3_4⇡24
    ─

╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
100
[2 3 4]

```

If you want to get multiple coordinates from an array, you may need to use [≡ rows](/docs/rows) and [¤ fix](/docs/fix).

```uiua
# Experimental!
≡⟔⊙¤,, [1 2 3 4 5] [1_5_3 6_2_4]
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 2:2
2 | ≡⟔⊙¤,, [1 2 3 4 5] [1_5_3 6_2_4]
     ─

╭─       
╷ 1 5 3  
  6 2 4  
        ╯
[1 2 3 4 5]
╭─     
╷ 0 0  
  1 1  
  0 2  
  1 2  
  0 1  
      ╯

```

You can use the returned indices with [⊡ pick](/docs/pick) to get the rows that were found.

If you expect one of the searched-for rows to be missing, you can use [⬚ fill](/docs/fill) to set a default value.

```uiua
# Experimental!
A ← [2 3 5 7 11 13]
.≡⟔⊙¤,A [1_2_3 4_5_6]
⬚∞⊡:A
```

```output
Warning: ⟔ coordinate is deprecated and will be removed in a future version, use ⊢ first ⊚ where ⌕ find instead
  at 3:3
3 | .≡⟔⊙¤,A [1_2_3 4_5_6]
      ─

╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─   
╷ 6  
╷ 0  
  1  
     
  6  
  2  
  6  
    ╯
╭─       
╷ ∞ 2 3  
  ∞ 5 ∞  
        ╯

```

</page>

<page url="https://www.uiua.org/docs/power">

# [ⁿ power](/docs/power)

### Dyadic pervasive function

Raise a value to a power

The second value is raised to the power of the first.

This is so you can think of `ⁿ` `x` as a single unit.

```uiua
ⁿ2 3
```

```output
9
```

```uiua
ⁿ2 [1 2 3]
```

```output
[1 4 9]
```

```uiua
ⁿ [1 2 3] [4 5 6]
```

```output
[4 25 216]
```

</page>

<page url="https://www.uiua.org/docs/&fc">

# [&fc](/docs/&fc) \- file - create

### Monadic function

Create a file and return a handle to it

```uiua
&fc "file.txt"
```

```output
file file.txt(□3)
```

The file can be read from with [&rs](/docs/&rs), [&rb](/docs/&rb), or [&ru](/docs/&ru).

The file can be written to with [&w](/docs/&w).

In some cases, the file may not be actually written to until it is closed with [&cl](/docs/&cl).

[⍜ under](/docs/under)[&fc](/docs/&fc) calls [&cl](/docs/&cl) automatically.

</page>

<page url="https://www.uiua.org/docs/less%20than">

# [< less than](/docs/less than)

### Dyadic pervasive function

Compare for less than

The second value is checked to be less than the first.

This is so you can think of `<` `x` as a single unit.

```uiua
<1 2
```

```output
0
```

```uiua
<5 5
```

```output
0
```

```uiua
<7 3
```

```output
1
```

```uiua
<2 [1 2 3]
```

```output
[1 0 0]
```

```uiua
< [1 2 2] [1 2 3]
```

```output
[0 0 0]
```

</page>

<page url="https://www.uiua.org/docs/astar">

# [astar](/docs/astar)

### Triadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Find shortest paths in a graph

Expects 3 functions and at least 1 value.

The value is the starting node.

The first function should return 1 or 2 arrays of equal [⧻ length](/docs/length).

\- An array of the neighboring nodes must always be returned.

\- An array of costs may be returned above the nodes array on the stack. If ommitted, all costs are assumed to be 1.

The second function should return a heuristic cost to reach the goal node.

\- The heuristic may return a value [≤ less or equal](/docs/less or equal) the actual cost

\- It must _never_ overestimate the cost, or the algorithm may not find the shortest path

The third function should return whether or not the goal node has been reached.
  
When called, [astar](/docs/astar) will pop any additional arguments its functions need from the stack.

On each iteration, the current node will be passed to each function, along with any of the additional arguments that each function needs.
  
If a path is found, a list of [□ box](/docs/box)ed arrays of all shortest paths is returned, as well as the cost.

If no path is found, an error is thrown.
  
In this example, we find the shortest path from the 2D point `0_0` to `3_5` in a grid.

The neighbors function returns the 4 cardinal directions with all costs of 1.

The heuristic function [⌵](/docs/absolute value)[/](/docs/reduce)[ℂ](/docs/complex)[\-](/docs/subtract) calculates the euclidean distance between two points.

The goal function simply checks if the current node [≍ match](/docs/match)es the given goal node.

```uiua
# Experimental!
Neis ← [∩¯,,⇌.⇡2]
Neis # Side-adjacent neighbors offsets

°□⊢ astar(
  ≡⋅1. +Neis¤ # Costs and neighbors
| ⌵/ℂ-        # Heuristic
| ≍           # Check if goal
)0_0 3_5      # Start and goal
```

```output
╭─       
╷ ¯1  0  
   0 ¯1  
   1  0  
   0  1  
        ╯
8
╭─     
╷ 0 0  
  0 1  
  1 1  
  1 2  
  2 2  
  2 3  
  2 4  
  2 5  
  3 5  
      ╯
```

If we omit the cost array from the neighbors function and simply use `1` as the heuristic, the algorithm becomes Dijkstra's algorithm.

```uiua
# Experimental!
Neis ← [∩¯,,⇌.⇡2]
°□⊢ astar(+Neis¤)1≍ 0_0 3_5
```

```output
8
╭─     
╷ 0 0  
  0 1  
  0 2  
  1 2  
  1 3  
  2 3  
  3 3  
  3 4  
  3 5  
      ╯
```

In the examples above, we use [°](/docs/un)[□](/docs/box)[⊢](/docs/first) to get only the first path. [⊢ first](/docs/first)[astar](/docs/astar) is optimized to not do extra work.

If we want _all_ shortest paths, we can omit [⊢ first](/docs/first).

```uiua
# Experimental!
Neis ← [∩¯,,⇌.⇡2]
astar(+Neis¤)1≍ 0_0 1_2
```

```output
3
╭─                         
  ╓─      ╓─      ╓─       
  ╟ 0 0   ╟ 0 0   ╟ 0 0    
    1 0     0 1     0 1    
    1 1     1 1     0 2    
    1 2     1 2     1 2    
        ╜       ╜       ╜  
                          ╯
```

If pathing on a grid like the examples above, we can use [° un](/docs/un)[⊚ where](/docs/where) to visualize the path that was taken!

```uiua
# Experimental!
Neis ← [∩¯,,⇌.⇡2]
°□⊢ astar(+Neis¤|⌵/ℂ-|≍) 3_4 13_20
°⊚
▽⟜≡▽8 # Upscale
```

```output
26
```
  
[astar](/docs/astar) is designed to be maximally flexible, so it can be used with graphs or grids or any other structure.

</page>

<page url="https://www.uiua.org/docs/&tlsl">

# [&tlsl](/docs/&tlsl) \- tls - listen

### Monadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Create a TLS listener and bind it to an address

Use [&tcpa](/docs/&tcpa) on the returned handle to accept connections.
  
See also: [&tcpl](/docs/&tcpl)

</page>

<page url="https://www.uiua.org/docs/below">

# [◡ below](/docs/below)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Keep all arguments to a function below the outputs on the stack

```uiua
# Experimental!
[◡+ 1 2]
```

```output
[3 1 2]
```

```uiua
# Experimental!
[◡(++) 1 2 3]
```

```output
[6 1 2 3]
```

This can be used with [⋅ gap](/docs/gap) and [∘ identity](/docs/identity) to copy values from arbitrarily low in the stack.

```uiua
# Experimental!
[◡⋅⋅⋅⋅∘ 1 2 3 4 5]
```

```output
[5 1 2 3 4 5]
```
  
See also: [◠ above](/docs/above)

</page>

<page url="https://www.uiua.org/tutorial/math">

# Math and Comparison

Uiua supports all the basic math operations as well as comparison, min/max, and rounding.

| Function                                 | ASCII | Args |
| ---------------------------------------- | ----- | ---- |
| [+ add](/docs/add)                       | +     | 2    |
| [\- subtract](/docs/subtract)            | \-    | 2    |
| [× multiply](/docs/multiply)             | \*    | 2    |
| [÷ divide](/docs/divide)                 | %     | 2    |
| [◿ modulus](/docs/modulus)               | 2     |      |
| [ⁿ power](/docs/power)                   | 2     |      |
| [ₙ logarithm](/docs/logarithm)           | 2     |      |
| [¯ negate](/docs/negate)                 | \`    | 1    |
| [⌵ absolute value](/docs/absolute value) | 1     |      |
| [⌈ ceiling](/docs/ceiling)               | 1     |      |
| [⌊ floor](/docs/floor)                   | 1     |      |
| [⁅ round](/docs/round)                   | 1     |      |
| [√ sqrt](/docs/sqrt)                     | 1     |      |
| [± sign](/docs/sign)                     | 1     |      |

| Function                                     | ASCII | Args |
| -------------------------------------------- | ----- | ---- |
| [\= equals](/docs/equals)                    | \=    | 2    |
| [≠ not equals](/docs/not equals)             | !=    | 2    |
| [< less than](/docs/less than)               | <     | 2    |
| [\> greater than](/docs/greater than)        | \>    | 2    |
| [≤ less or equal](/docs/less or equal)       | <=    | 2    |
| [≥ greater or equal](/docs/greater or equal) | \>=   | 2    |
| [↧ minimum](/docs/minimum)                   | 2     |      |
| [↥ maximum](/docs/maximum)                   | 2     |      |
| [⌊ floor](/docs/floor)                       | 1     |      |
| [⌈ ceiling](/docs/ceiling)                   | 1     |      |
| [⁅ round](/docs/round)                       | 1     |      |
| [∿ sine](/docs/sine)                         | 1     |      |
| [∠ atangent](/docs/atangent)                 | 2     |      |

Most of these are used mostly how you might think.

```uiua
+2 5
```

```output
7
```

```uiua
↥2 5
```

```output
5
```

```uiua
ⁿ2 5
```

```output
25
```

```uiua
⌈2.5
```

```output
3
```

```uiua
√4
```

```output
2
```

Uiua has no boolean type. Comparison operators return `0` for false and `1` for true.

```uiua
=2 5
```

```output
0
```

```uiua
=2 2
```

```output
1
```

One thing to note is that non-commutative operators work backwards.

This is so you can think of the operator and the second number as a single unit.

```uiua
-2 5
```

```output
3
```

```uiua
<2 5
```

```output
0
```

```uiua
÷2 5
```

```output
2.5
```

Because of how stack operations work, you can delay operations until after all the arguments are on the stack.

```uiua
×++1 2 3 4
```

```output
24
```

This is not special syntax. All the numbers are pushed to the stack, then the operators work on them.

Remember that you can type the names of operators and then run to format them.

```uiua
# Click Run to format!
max sqrt2 mod10 abs`31
```

```output
1.4142135623730951
```

## [Adicity](#adicity)

Some programming languages use the terms "unary" and "binary" to refer to functions that take one or two arguments respectively. While these are the Latin terms, many array languages, including Uiua, prefer to use the Greek terms "monadic" and "dyadic".

As you read Uiua's documentation, you will see these terms used to describe functions (and modifiers).

For example, [√ sqrt](/docs/sqrt) is a monadic function, and [+ add](/docs/add) is a dyadic function.

On this site, monadic functions are in green and dyadic functions are in blue.

</page>

<page url="https://www.uiua.org/tutorial/strings">

# Working with Strings 

There is a common misconception that array languages like Uiua are only really good for mathematical tasks; that rich text processing is better left to more traditional languages. This is not the case! Strings are, after all, just arrays of characters! 

That being said, it may not be immediately clear how to perform common string manipulations in Uiua. This tutorial will cover the basics. 

## [Converting numbers with ](#converting-numbers-with-parse)[⋕ parse](/docs/parse)

[⋕ parse](/docs/parse) is the standard way to convert a string to a number. 

```uiua
⋕"5.2"
```

```output
5.2
```

It can also be used on arrays of boxed strings. 

```uiua
⋕{"3" "-16" "π" "1e3"}
```

```output
[3 ¯16 π 1000]
```

[° un](/docs/un)[⋕ parse](/docs/parse) will convert numbers to strings. 

```uiua
°⋕ 10
°⋕ [1 2 3]
°⋕ ↯3_4⇡12
```

```output
"10"
{"1" "2" "3"}
╭─                   
╷ ⌜0⌟ ⌜1⌟ ⌜2⌟  ⌜3⌟   
  ⌜4⌟ ⌜5⌟ ⌜6⌟  ⌜7⌟   
  ⌜8⌟ ⌜9⌟ ⌜10⌟ ⌜11⌟  
                    ╯
```

## [Splitting with ](#splitting-with-partition)[⊜ partition](/docs/partition)

As discussed in the [Thinking With Arrays](/tutorial/thinkingwitharrays) tutorial, [⊜ partition](/docs/partition) can be used to split an array by a delimiter. 

First, we create a mask of places where the delimiter is _not_  using [≠ not equals](/docs/not equals). In this case, we'll use the space character. 

```uiua
≠@ . "Split this string"
```

```output
"Split this string"
[1 1 1 1 1 0 1 1 1 1 0 1 1 1 1 1 1]
```

[⊜ partition](/docs/partition) will then split the strings at the places where the mask changes, ommitting `0`s. 

```uiua
⊜□ ≠@ . "Split this string"
```

```output
{"Split" "this" "string"}
```

[⊜ partition](/docs/partition) has an alternate functionality when its function has signature `|2.1` instead of `|1.1`. This will perform a reduction operation, similar to [/ reduce](/docs/reduce). 

Using [planet notation](/tutorial/advancedstack#planet-notation), we can select the first or last split section. 

```uiua
⊜⊙◌ ≠@ . "Split this string"
```

```output
"Split"
```

```uiua
⊜⋅∘ ≠@ . "Split this string"
```

```output
"string"
```

For parts of the string that are not the first or last, we can simply [□ box](/docs/box) and [⊏ select](/docs/select). 

```uiua
⊏1_3 ⊜□≠@,. "lorem,ipsum,dolor,sit,amet"
```

```output
{"ipsum" "sit"}
```

[⊜ partition](/docs/partition) can be nested to split by multiple delimiters. 

For example, if you were reading from a file that contained rows of numbers separated by spaces, you could use [⊜ partition](/docs/partition) to create a multi-dimensional array. 

Here, the contents of the file will be represented as a multi-line string. We use [⋕ parse](/docs/parse) as the inner function to parse the numbers. 

```uiua
$ 1  8   4 99
$ 5  20  0 0
$ 78 101 1 8
⊜(⊜⋕≠@ .)≠@\n.
```

```output
╭─             
╷  1   8 4 99  
   5  20 0  0  
  78 101 1  8  
              ╯
```

This assumes that the two delimiters delimit different dimensions of the array. If they delimit the same dimension, we can use [¬ not](/docs/not)[∊ member](/docs/member). 

```uiua
$ 1  8   4 99
$ 5  20  0 0
$ 78 101 1 8
⊜⋕¬∊," \n"
```

```output
[1 8 4 99 5 20 0 0 78 101 1 8]
```

## [Finding substrings with ](#finding-substrings-with-mask)[⦷ mask](/docs/mask)

What if we want to split by a non-scalar delimiter? Simply dropping a string delimiter into the code above produces an error. 

```
⊜□ ≠" - ". "foo - bar - ba-az"

```

We might try [⌕ find](/docs/find). While there may be cases when this output is useful, it is not quite what we want here. 

```uiua
    ⌕" - "  "foo - bar - ba-az"
⊜□ ¬⌕" - ". "foo - bar - ba-az"
```

```output
[0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0]
{"foo" "- bar" "- ba-az"}
```

This is because [⌕ find](/docs/find) only marks the start of each matching substring. 

[⦷ mask](/docs/mask) marks each substring with an increasing number. 

```uiua
⦷" - ". "foo - bar - ba-az"
```

```output
"foo - bar - ba-az"
[0 0 0 1 1 1 0 0 0 2 2 2 0 0 0 0 0]
```

This works great with [⊜ partition](/docs/partition) to split the string how we want. 

```uiua
    ⦷" - "  "foo - bar - ba-az"
   ¬⦷" - "  "foo - bar - ba-az"
⊜□ ¬⦷" - ". "foo - bar - ba-az"
```

```output
[0 0 0 1 1 1 0 0 0 2 2 2 0 0 0 0 0]
[1 1 1 0 0 0 1 1 1 ¯1 ¯1 ¯1 1 1 1 1 1]
{"foo" "bar" "ba-az"}
```

Notice that while [¬ not](/docs/not) leaves parts of the mask negative, [⊜ partition](/docs/partition) ignores all sections that are not positive. 

## [Replacing substrings with ](#replacing-substrings-with-under)[⍜ under](/docs/under)

Because [⍜ under](/docs/under) works with [⊜ partition](/docs/partition), we can use it with [⦷ mask](/docs/mask) to replace substrings. 

In this example, we replace each row of the [⊜ partition](/docs/partition)ed array with the string `"orb"`. 

```uiua
           ⦷ "ab"  "abracadabra"
 ⊜∘        ⦷ "ab". "abracadabra"
⍜⊜∘≡⋅"orb" ⦷ "ab". "abracadabra"
```

```output
[1 1 0 0 0 0 0 2 2 0 0]
╭─      
╷ "ab"  
  "ab"  
       ╯
"orbracadorbra"
```

This can even be used to replace the matches with different strings. 

```uiua
⍜⊜□◌ ⦷ "ab". "abracadabra" {"[first]" "[second]"}
```

```output
"[first]racad[second]ra"
```

Here is how you might replace with a variable number of strings. 

```uiua
F ← ⍜⊜□(↙⧻) ⦷ "ab".:°⋕⇡10
F "abracadabra"
F "abcdefg"
F "ababab|abababab"
```

```output
"0racad1ra"
"0cdefg"
"012|3456"
```

## [](#regex)[regex](/docs/regex)

When a string search operation is especially complicated, you can always fall back to regular expressions using [regex](/docs/regex). 

Uiua uses [Rust's regex engine](https://docs.rs/regex) under the hood, so you can use the same syntax as you would in Rust. 

[regex](/docs/regex) returns a table of boxed strings. The first element in each row is the match. Subsequent elements are the captures. 

```uiua
regex "\\d{3,4}" "(555) 310-1984"
```

```output
╭─        
╷ ⌜555⌟   
  ⌜310⌟   
  ⌜1984⌟  
         ╯
```

```uiua
regex "a([bc])" "abracadabra"
```

```output
╭─          
╷ ⌜ab⌟ ⌜b⌟  
  ⌜ac⌟ ⌜c⌟  
  ⌜ab⌟ ⌜b⌟  
           ╯
```

Optional captures may need [⬚ fill](/docs/fill) to avoid errors. 

```
regex "foo(bar)?(baz)?" "foobar\nfoobaz"

```

```uiua
⬚""regex "foo(bar)?(baz)?" "foobar\nfoobaz"
```

```output
╭─                      
╷ ⌜foobar⌟ ⌜bar⌟ ⌜⌟     
  ⌜foobaz⌟ ⌜⌟    ⌜baz⌟  
                       ╯
```

</page>

<page url="https://www.uiua.org/docs/member">

# [∊ member](/docs/member)

### Dyadic function

Check if each row of one array exists in another

```uiua
∊ 2 [1 2 3]
```

```output
1
```

```uiua
∊ 5 [1 2 3]
```

```output
0
```

```uiua
∊ [1 2 3] [0 3 4 5 1]
```

```output
[1 0 1]
```

```uiua
∊ [4 5 6] [1_2_3 4_5_6]
```

```output
1
```

```uiua
∊ [1_2_3 4_5_6] [3 4 5]
```

```output
╭─       
╷ 0 0 1  
  1 1 0  
        ╯
```

```uiua
∊ 2 [1_2_3 4_5_6]
```

```output
[1 0]
```
  
With the help of [▽ keep](/docs/keep), you can use [∊ member](/docs/member) to get a set intersection.

```uiua
▽∊, "abracadabra" "that's really cool"
```

```output
"arac"
```
  
[∊ member](/docs/member) is closely related to [⊗ indexof](/docs/indexof).

</page>

<page url="https://www.uiua.org/docs/utf%E2%82%88">

# [utf₈](/docs/utf₈)

### Monadic function

Convert a string to UTF-8 bytes

```uiua
utf₈ "hello!"
```

```output
[104 101 108 108 111 33]
```

```uiua
utf₈ "❤️"
```

```output
[226 157 164 239 184 143]
```

You can use [° un](/docs/un) to convert UTF-8 bytes back to a string.

```uiua
°utf₈ [226 156 168 32 119 111 119 33]
```

```output
"✨ wow!"
```
  
[utf₈](/docs/utf₈) is different from just [+ add](/docs/add)ing or subtracting `@\0`.

Character math can only convert to and from UTF-32.

```uiua
-@\0 "👩🏽‍👩🏻‍👦🏻‍👧🏽"
```

```output
[128105 127997 8205 128105 127995 8205 128102 127995 8205 128103 127997]
```

```uiua
utf₈ "👩🏽‍👩🏻‍👦🏻‍👧🏽"
```

```output
[240 159 145 169 240 159 143 189 226 128 141 240 159 145 169 240 159 143 187 226 128 141 240 159 145 166 240 159 143 187 226 128 141 240 159 145 167 240 159 143 189]
```

</page>

<page url="https://www.uiua.org/docs/dip">

# [⊙ dip](/docs/dip)

### Monadic modifier

Temporarily pop the top value off the stack and call a function

See the [Advanced Stack Manipulation Tutorial](/tutorial/advancedstack) for a more complete understanding of why [⊙ dip](/docs/dip) is useful.
  
```uiua
[⊙+ 1 2 3]
```

```output
[1 5]
```

```uiua
[⊙⊙+ 1 2 3 4]
```

```output
[1 2 7]
```

This is especially useful when used in a [⊃ fork](/docs/fork).

In a [⊃ fork](/docs/fork) expression, you can use [⊙ dip](/docs/dip), [⋅ gap](/docs/gap), and [∘ identity](/docs/identity) to select out values.

For example, if you wanted to add 3 values but keep the all 3 on top of the stack:

```uiua
[⊃⊙⊙∘(++) 3 5 10]
```

```output
[3 5 10 18]
```

By replacing a [⊙](/docs/dip) with a [⋅](/docs/gap), you pop the argument in that spot instead of keeping it:

```uiua
[⊃⊙⊙∘(++) 3 5 10]
```

```output
[3 5 10 18]
```

```uiua
[⊃⊙⋅∘(++) 3 5 10]
```

```output
[3 10 18]
```

```uiua
[⊃⋅⊙∘(++) 3 5 10]
```

```output
[5 10 18]
```

```uiua
[⊃⊙∘(++) 3 5 10]
```

```output
[3 5 18]
```

</page>

<page url="https://www.uiua.org/docs/&gifd">

# [&gifd](/docs/&gifd) \- gif - decode

### Monadic 2-output function

Decode a gif from a byte array

Returns a framerate in seconds and a rank 4 array of RGBA frames.
  
See also: [&gife](/docs/&gife)

</page>

<page url="https://www.uiua.org/docs/&ftr">

# [&ftr](/docs/&ftr) \- file - trash

### Monadic 0-output function

Move a file or directory to the trash

```uiua
&ftr "example.txt"
```

Moves the file or directory at the given path to the trash.

This is a safer alternative to [&fde](/docs/&fde).

</page>

<page url="https://www.uiua.org/docs/type">

# [type](/docs/type)

### Monadic function

Check the type of an array

`0` indicates a number array.

`1` indicates a complex array.

`2` indicates a character array.

`3` indicates a box array.

```uiua
type 5
```

```output
0
```

```uiua
type i
```

```output
1
```

```uiua
type "hello"
```

```output
2
```

```uiua
type □[5 6]
```

```output
3
```

```uiua
∵ type    {10 "dog" [1 2 3]}
∵(type°□) {10 "dog" [1 2 3]}
```

```output
[3 3 3]
[0 2 0]
```

</page>

<page url="https://www.uiua.org/tutorial/bindings">

# Bindings

Bindings are global names that can be given to Uiua values. They are denoted with `←`, which the formatter will convert from `=` when appropriate.

```uiua
a = 3
b ← 5
+ a b
```

```output
8
```

Valid binding names can be made up of any sequence of uppercase or lowercase alphabetic characters OR a single non-alphanumeric character that is not already used for a Uiua function or syntax.

```uiua
NumOne ← 1
NumTwo ← 2
😀 ← "happy"
```

_Warning_: It is not guaranteed that any particular non-alphanumeric character will not be used for a built-in function in the future. Use them at your own risk. Emojis are safe though.

Unlike most programming languages, binding names in Uiua _cannot_ contain numbers or underscores.

```uiua
Variable_1 ← 5
```

```output
Error: Unexpected token ←
  at 1:12
1 | Variable_1 ← 5
               ─
```

Bindings _can_ contain subscript numbers. These will format from `__` followed by some digits. Try formatting the example below!

```uiua
X__1 = 5
Sha__256 = "TODO"
```

Bindings are case-sensitive.

The parser can sometimes mistake all-lowercase binding names for unformatted built-in functions.

Here, the parser thinks that `part` is [⊜ partition](/docs/partition).

```uiua
part = 5
```

```output
Error: Stack was empty when evaluating argument 2
  at 1:1
1 | part = 5
    ────
```

Binding names with 2 or more characters should be [PascalCase (also known as upper CamelCase)](https://en.wikipedia.org/wiki/Camel%5Fcase) to avoid this issue.

```uiua
Part = 5
*2 Part
```

```output
10
```

Bindings run the code to the right of the `←`, then pop the top value off the stack and bind it to the name on the left.

Note, though, that an empty right side is perfectly valid! This means you can bind values that were created on previous lines.

```uiua
×6 7
Answer ←
[Answer]
```

```output
[42]
```

## [Binding Functions](#binding-functions)

If the code on the right side of the `←` requires more than 0 values to be on the stack, then instead of evaluating its right side immediately, the right side will be bound as a function.

This is how you make named functions in Uiua.

```uiua
F ← +1
F 5
```

```output
6
```

```uiua
Cube ← ××..
Cube 6
```

```output
216
```

```uiua
👋 ← ⊂"Hello, "
👋 "World!"
```

```output
"Hello, World!"
```

If the code on the right side takes 0 arguments but you still want it to be a function, it must be surrounded by `()`s.

Notice how the first example here gives the same value every time, while the second one does not.

```uiua
F ← ⚂
F F F
```

```output
0.060482424723018124
0.060482424723018124
0.060482424723018124
```

```uiua
F ← (⚂)
F F F
```

```output
0.013324025440782261
0.8487411614368863
0.8810940605268704
```

The [next section](/tutorial/functions) discusses functions in more detail.

</page>

<page url="https://www.uiua.org/tutorial/inverses">

# Inverses

Uiua has two modifiers, [° un](/docs/un) and [⍜ under](/docs/under), which work with _inverses_. The inverse of a function is a function that conceptually "undoes" it.

Working with inverses is a fundamental part of writing Uiua code. It is an elegant mechanism that captures many different patterns.

## [](#un)[° un](/docs/un)

The [° un](/docs/un) modifier inverts the behavior of a function.

```uiua
°(+1) 5
```

```output
4
```

```uiua
°⊟ [1 2]
```

```output
2
1
```

```uiua
°∿ 1
```

```output
η
```

As discussed [previously](/tutorial/arrays#array-model), [° un](/docs/un)[□ box](/docs/box) removes an array from a box.

```uiua
°□ ⊢{"unbox" "me!"}
```

```output
"unbox"
```

One interesting use of [° un](/docs/un) is to put an array's rows onto the stack by [° un](/docs/un)ing stack array notation with [⊙ dip](/docs/dip) and [∘ identity](/docs/identity). The number of rows in the array must match though!

```uiua
[⊙⊙∘] 1 2 3
```

```output
[1 2 3]
```

```uiua
°[⊙⊙∘] [1 2 3]
```

```output
3
2
1
```

```uiua
°[⊙⊙⊙∘] [1 2 3]
```

```output
Error: This °[] expects an array with 4 rows, but the array has 3
  at 1:2
1 | °[⊙⊙⊙∘] [1 2 3]
     ──────
```

[° un](/docs/un)ing box array notation will unbox the items.

```uiua
°[⊙⊙∘] {1 2_3 "hmmm"}
```

```output
⌜hmmm⌟
⟦2 3⟧
□1
```

```uiua
°{⊙⊙∘} {1 2_3 "hmmm"}
```

```output
"hmmm"
[2 3]
1
```

You can find more uses of [° un](/docs/un) in it's documentation, including a list of all [° un](/docs/un)\-compatible functions and modifiers.

## [](#under)[⍜ under](/docs/under)

[⍜ under](/docs/under) expresses a more powerful inversion pattern. It captures the pattern of doing some transformation, modifying the data, then undoing the transformation.

This may not seem immediately useful, but you'll find it is a pattern you encounter everwhere, even in your everday life. You might open a drawer, take something out, then close the drawer. You might get on a bus, the bus travels, then you get off the bus.

[⍜ under](/docs/under) takes two functions which we will call `F` and `G`. It calls `F`, then calls `G`, then calls an inverse of `F`.

Many functions that do not work with [° un](/docs/un) work with [⍜ under](/docs/under) because [⍜ under](/docs/under) can keep track of _context_. One example of this in action is [⍜ under](/docs/under)[⊡ pick](/docs/pick), which allows us to modify an element or row of an array.

```uiua
⍜(⊡2|×10) [1 2 3 4]
```

```output
[1 2 30 4]
```

This code picks out item `2` of the array, multiplies it by `10`, then puts it back in the array.

If the values passed to [⍜ under](/docs/under)'s functions are not constants, they can also be put outside, albeit in a different order.

```uiua
⍜⊡× 2 [1 2 3 4] 10
```

```output
[1 2 30 4]
```

This works because [⍜ under](/docs/under) keeps track of the original array and passes it to the inversion of [⊡ pick](/docs/pick).

If you wanted to set a value in an array rather than modifying it, you could use [◌ pop](/docs/pop) or [⋅ gap](/docs/gap) instead of [× multiply](/docs/multiply).

```uiua
⍜(⊡2)⋅∞ [1 2 3 4]
⍜⊡◌ 2 [1 2 3 4] ∞
```

```output
[1 2 ∞ 4]
[1 2 ∞ 4]
```

It's not just [⊡ pick](/docs/pick)! Many functions work with [⍜ under](/docs/under)!

```uiua
⍜(↙2)/× [3 5 4 2]
```

```output
[15 4 2]
```

```uiua
⍜(↻3|⊂0) [1 2 3 4 5]
```

```output
[1 2 3 0 4 5]
```

```uiua
⍜×⁅ 1e3 π
```

```output
3.142
```

```uiua
.↯3_4⇡12
⍜♭⇌
```

```output
╭─           
╷ 0 1  2  3  
  4 5  6  7  
  8 9 10 11  
            ╯
╭─           
╷ 11 10 9 8  
   7  6 5 4  
   3  2 1 0  
            ╯
```

You can even use [⍜ under](/docs/under) on a function that has already been [° un](/docs/un)ed. This is a nice way to work with [□ box](/docs/box)ed data.

```uiua
≡⍜°□(⊂:@!) {"wow" "cool" "omg"}
```

```output
{"wow!" "cool!" "omg!"}
```
  
Let's say you wanted to utilize a struct-like pattern. Uiua does not have structs or objects with fields like many other languages do, but you can simulate them with box arrays. This can be slow, so you should not do this with any data that needs to accessed in tight loops.

[⍜ under](/docs/under) allows a field getter to also be a setter!

```uiua
Person ← {⊙⊙∘}
Name ← °□⊡0
Surname ← °□⊡1
Age ← °□⊡2

FmtPerson ← $"_ is _ years old" ⊃(Name|Age)
PassYear ← ⍜Age(+1)

Dan ← Person "Dan" "Danson" 31
FmtPerson Dan
FmtPerson PassYear Dan
```

```output
"Dan is 31 years old"
"Dan is 32 years old"
```

You can find more uses of [⍜ under](/docs/under) in it's documentation, including a list of all [⍜ under](/docs/under)\-compatible functions and modifiers.

## [Setting Inverses](#setting-inverse)

Many functions, especially more complex ones, do not have well-defined inverses. However, you can use the [setinv](/docs/setinv) and [setund](/docs/setund) modifiers to define them yourself.

[setinv](/docs/setinv) sets a simple inverse that is compatible with [° un](/docs/un).

For example, [⊢ first](/docs/first) does not have an [° un](/docs/un)\-compatible inverse, but we can define one.

```uiua
MyFirst ← setinv(⊢|[∘])
MyFirst [1 2 3]
°MyFirst 5
```

```output
1
[5]
```

This inverse is also compatible with [⍜ under](/docs/under).

```uiua
MyFirst ← setinv⊢[∘]
⍜⊢(×10) [2 3 4]
⍜MyFirst(×10) [2 3 4]
```

```output
[20 3 4]
[20]
```

Inverses should have the opposite signature of function they are the inverse of. If it does not, you will get a warning.

```uiua
F = setinv+-
```

```output
Warning: setinv's functions must have opposite signatures, but their signatures are |2 and |2
  at 1:5
1 | F = setinv+-
        ──────
```

[setund](/docs/setund) is more complicated. See its documentation for how to use it.

[setinv](/docs/setinv) and [setund](/docs/setund) can be nested so that an inverse can be fully defined in all cases.

This example shows how the different inverses get called.

```uiua
F ← setund(setinv("normal"|"inverse")|"do"|"undo")
F
°F
{⍜F"G"}
```

```output
Warning: setinv's functions must have opposite signatures, but their signatures are |0 and |0
  at 1:12
1 | F ← setund(setinv("normal"|"inverse")|"do"|"undo")
               ──────

"normal"
"inverse"
{"undo" "G" "do"}

```

</page>

<page url="https://www.uiua.org/docs/system">

| System - FilesystemWork with files and directories[&cd](/docs/&cd)change directory[&fo](/docs/&fo)file - open[&fc](/docs/&fc)file - create[&fde](/docs/&fde)file - delete[&ftr](/docs/&ftr)file - trash[&fe](/docs/&fe)file - exists[&fld](/docs/&fld)file - list directory[&fif](/docs/&fif)file - is file[&fras](/docs/&fras)file - read all to string[&frab](/docs/&frab)file - read all to bytes[&fwa](/docs/&fwa)file - write all         | System - Standard I/ORead and write standard input and output[&s](/docs/&s)show[&pf](/docs/&pf)print and flush[&p](/docs/&p)print with newline[&sc](/docs/&sc)scan line                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| System - EnvironmentQuery the environment[&ts](/docs/&ts)terminal size[&raw](/docs/&raw)set raw mode[&args](/docs/&args)arguments[&var](/docs/&var)environment variable                                                                                                                                                                                                                                                                        | System - StreamsRead from and write to streams[&rs](/docs/&rs)read to string[&rb](/docs/&rb)read to bytes[&ru](/docs/&ru)read until[&w](/docs/&w)write[&cl](/docs/&cl)close handle         |
| System - CommandsExecute commands[&runi](/docs/&runi)run command inherit[&runc](/docs/&runc)run command capture[&runs](/docs/&runs)run command stream[&invk](/docs/&invk)invoke                                                                                                                                                                                                                                                                | System - AudioWork with audio[&ad](/docs/&ad)audio - decode[&ae](/docs/&ae)audio - encode[&ap](/docs/&ap)audio - play[&asr](/docs/&asr)audio - sample rate[&ast](/docs/&ast)audio - stream |
| System - ImagesWork with static images[&imd](/docs/&imd)image - decode[&ime](/docs/&ime)image - encode[&ims](/docs/&ims)image - show                                                                                                                                                                                                                                                                                                           | System - GIFsWork with animated GIFs[&gifd](/docs/&gifd)gif - decode[&gife](/docs/&gife)gif - encode[&gifs](/docs/&gifs)gif - show                                                         |
| System - TCPWork with TCP sockets[&tcpl](/docs/&tcpl)tcp - listen[&tlsl](/docs/&tlsl)🧪tls - listen[&tcpa](/docs/&tcpa)tcp - accept[&tcpc](/docs/&tcpc)tcp - connect[&tlsc](/docs/&tlsc)tls - connect[&tcpsnb](/docs/&tcpsnb)tcp - set non-blocking[&tcpsrt](/docs/&tcpsrt)tcp - set read timeout[&tcpswt](/docs/&tcpswt)tcp - set write timeout[&tcpaddr](/docs/&tcpaddr)tcp - address[&httpsw](/docs/&httpsw)https - Make an HTTP(S) request | System - FFIForeign function interface[&ffi](/docs/&ffi)🧪foreign function interface[&memcpy](/docs/&memcpy)🧪foreign function interface - copy[&memfree](/docs/&memfree)🧪free memory     |
| System - Misc[&exit](/docs/&exit)exit[&clget](/docs/&clget)get clipboard contents[&clset](/docs/&clset)set clipboard contents[&sl](/docs/&sl)sleep[&camcap](/docs/&camcap)webcam - capture                                                                                                                                                                                                                                                     |                                                                                                                                                                                            |

</page>

<page url="https://www.uiua.org/docs/ceiling">

# [⌈ ceiling](/docs/ceiling)

### Monadic pervasive function

Round to the nearest integer towards `∞`

```uiua
⌈1.5
```

```output
2
```

```uiua
⌈¯1.5
```

```output
¯1
```

```uiua
⌈[1.5 ¯1.5 0.5 ¯0.5]
```

```output
[2 ¯1 1 0]
```

</page>

<page url="https://www.uiua.org/docs/minimum">

# [↧ minimum](/docs/minimum)

### Dyadic pervasive function

Take the minimum of two arrays

```uiua
↧ 3 5
```

```output
3
```

```uiua
↧ [1 4 2] [3 7 1]
```

```output
[1 4 1]
```
  
Uiua does not have dedicated boolean logical operators.

[↧ minimum](/docs/minimum) can be used as a logical AND.

```uiua
≥5:≤8. [6 2 5 9 6 5 0 4]
↧,,
```

```output
[1 1 1 0 1 1 1 1]
[1 0 1 1 1 1 0 0]
[1 0 1 0 1 1 0 0]
```

</page>

<page url="https://www.uiua.org/docs/not">

# [¬ not](/docs/not)

### Monadic pervasive function

Logical not

```uiua
¬0
```

```output
1
```

```uiua
¬1
```

```output
0
```

```uiua
¬[0 1 1 0]
```

```output
[1 0 0 1]
```

```uiua
¬[0 1 2 3]
```

```output
[1 0 ¯1 ¯2]
```
  
This is equivalent to [\-](/docs/subtract)[:](/docs/flip)`1`

```uiua
¬7
```

```output
¯6
```

```uiua
¬[1 2 3 4]
```

```output
[0 ¯1 ¯2 ¯3]
```

</page>

<page url="https://www.uiua.org/docs/&runs">

# [&runs](/docs/&runs) \- run command stream

### Monadic 3-output function

Run a command with streaming IO

Expects either a string, a rank `2` character array, or a rank `1` array of [□ box](/docs/box) strings.

Returns 2 stream handles.

The first can be written to with [&w](/docs/&w) to send input to the command's stdin.

The second and third can be read from with [&rs](/docs/&rs), [&rb](/docs/&rb), or [&ru](/docs/&ru) to read from the command's stdout and stderr.

Using [&cl](/docs/&cl) on _all 3_ handles will kill the child process.

[⍜ under](/docs/under)[&runs](/docs/&runs) calls [&cl](/docs/&cl) on all 3 streams automatically.

</page>

<page url="https://www.uiua.org/docs/stringify">

# [stringify](/docs/stringify)

### Monadic 0-argument modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Convert code into a string instead of compiling it

```uiua
# Experimental!
stringify(/+ran+1)
```

```output
"(/+⇡+1)"
```

This is mostly useful when used in a macro.

```uiua
# Experimental!
F! ← ^! &p$"Running code: _" stringify^!^.
F!(+ 1 2)
```

```output
stdout:
Running code: (+ 1 2)

3
```
  
The opposite of [stringify](/docs/stringify) is [quote](/docs/quote).

</page>

<page url="https://www.uiua.org/tutorial/macros">

# Macros

Defining your own functions that work on arrays is pretty easy. Just a name, a `←`, and you're done.

But what if you want to define functions that use other functions?

## [Placeholders and !s](#placeholders-and-bangs)

Anywhere you can put a built-in or inline function, you can also put a `^!`. This is called a _placeholder_.

Any named function with `^!`s in it is a macro.

However, there is one additional requirement: macros must have names that end in as many `!`s as the number of functions they take.

Macros work similarly to modifiers. They take some function arguments and modify how they are used.

Lets look at a simple example using [/ reduce](/docs/reduce). It reduces a function over the numbers up to the given range.

```uiua
ReduceRange! ← /^!+1⇡
ReduceRange!+5
ReduceRange!×4
```

```output
15
24
```

Here is another simple example which calls a function on a reversed version of each row of an array.

```uiua
OnRev! ← ≡⍜⇌^!
OnRev!(↘1) ↯3_4⇡12
OnRev!(⊂π) ↯3_4⇡12
```

```output
╭─        
╷ 0 1  2  
  4 5  6  
  8 9 10  
         ╯
╭─             
╷ 0 1  2  3 π  
  4 5  6  7 π  
  8 9 10 11 π  
              ╯
```

A macro can take as many functions as you want. Modifiers with two or more function arguments will be formatted to use `‼`s as needed. Try running the following example to format it.

```uiua
F!!! ← ⊂/^!⊃^!^!
F!!!+×⊂ [1 2 3][4 5 6]
```

```output
[32 1 2 3 4 5 6]
```

## [Operand Functions](#operand-functions)

When Uiua code is compiled, a macro passes its operands as values on a special operand stack. This stack can be manipulated in a few ways to make macros more powerful.

`^!` is actually an operand function. It pops the operand at the top of the operand stack and inlines it into its place in the macro.

There are also operand function analogues for [. duplicate](/docs/duplicate), [: flip](/docs/flip), and [, over](/docs/over).

These are `^.`, `^:`, and `^,` respectively.

Like normal Uiua code, operand functions are evaluated from right to left.

However, operands are initially pushed to the stack in reverse order. This means that the macro operand furthest to the right starts at the top of the operand stack.

Let's look at a simple example to see how this ordering works.

```uiua
F‼ ← ^!^!
G‼ ← ^!^!^:
F‼(⊂1|⊂2) []
G‼(⊂1|⊂2) []
```

```output
[1 2]
[2 1]
```

If we wanted to call each of two functions twice, we could use a similar pattern to what we use in normal Uiua code.

```uiua
[,, 1 2]
F‼ ← ^!^!^!^!^,^,
F‼(⊂1|⊂2) []
```

```output
[1 2 1 2]
[1 2 1 2]
```

## [Two Kinds of Macros](#two-kinds)

The macros described so far are called _stack macros_, because they move operands around on a stack.

But Uiua actually has a second kind of macro. _Array macros_ put their operands in an array. The array can then be arbitrarily manipulated with normal Uiua code.

## [Array Macros](#array-macros)

Array macros are defined by putting a `^` right after the binding's `←`. Array macro names must still end in some number of `!`s.

Here is a basic example that simply prints its operands. It returns the number `5` as the actual generated code.

```uiua
F‼ ←^ "5" &pf
F‼⊂(+1)
```

```output
stdout:
{"⊂" "+1"}

5
```

As you can see, the operands are passed to the function as an array of boxed strings.

Array macros may be passed a function pack operand. Each operand from the pack will be put in the array.

```uiua
F! ←^ $"_"
F!(+|-|×|÷)
```

```output
{"+" "-" "×" "÷"}
```

The array macro's function must return either a string or an array of boxed strings. This value will be converted back to Uiua code and compiled as normal.

Format strings can help a lot in generating new code. For example, if we wanted to make a version of [∩ both](/docs/both) that calls its function on an arbitrary number of sets of values, we could use [↯ reshape](/docs/reshape) and [⊓ bracket](/docs/bracket).

```uiua
All‼ ←^ $"⊓(_)" /$"_|_" ↯⋕ °{⊙∘}
[All‼3+ 1 2 3 4 5 6]
```

```output
[3 7 11]
```

First, we extract the two operands: the count and the function. The count comes in as a string, so we have to [⋕ parse](/docs/parse) it before using [▽ keep](/docs/keep) to make an array of copies of the function.

We use [/ reduce](/docs/reduce) with a format string to form the branches of a function pack, then use another format string to put them in [⊓ bracket](/docs/bracket).

The resulting string is then compiled as Uiua code.
  
Array macros have the ability to create new bindings, including new macros.

```uiua
Def‼ ←^ $"_\n_" ⊃(/$"_ ← _"|/$"Also_ ← _")
Def‼(X|5)
+ X AlsoX
```

```output
10
```

This is a simple example, but this concept can be used to create very powerful meta-programming tools.

## [Compile Time vs Run Time](#compile-time-vs-run-time)

The body of an array macro is always evaluated at compile time. One consequence of this is that bindings whose values cannot be known at compile time cannot be used in an array macro.

For example, because the value `5` is always the same, it is always known at compile time, and we can use a name that binds `5` in an array macro.

```uiua
x ← 5
F! ←^ $"_ _":x ⊢
F!¯
```

```output
¯5
```

However, if we use a value that cannot be known at compile time, like the result of the [⚂ random](/docs/random) function, we will get an error.

```uiua
x ← ⚂
F! ←^ $"_ _":x ⊢
F!¯
```

```output
Error: F! references runtime binding `x`
  at 3:1
3 | F!¯
    ──
  in macro expansion at 3:1
```

There are two ways to work around this. The first is to simply put the code that generates the value in the macro itself.

```uiua
F! ←^ $"_ ⚂" ⊢
F!¯
```

```output
¯0.0959892785193247
```

The second is to use the [comptime](/docs/comptime) modifier, which forces its function to be evaluated at compile time.

```uiua
x ← comptime(⚂)
F! ←^ $"_ _":x ⊢
F!¯
```

```output
¯0.8677790361593186
```

## [What kind of macro should I use?](#which-to-use)

Which kind of macro you use depends on what kind of code you are writing.

Array macros are much more powerful than stack macros, but they can be more complicated to write.

Additionally, stack macros are [hygienic](https://en.wikipedia.org/wiki/hygienic%5Fmacro). When a stack macro refers to names of things, bindings you have definined in the surrounding code will not interfere; you will never accidentally use the wrong binding. Array macros make no such guarantees.

If you conceptually just want to define your own modifier, a stack macro is probably the simplest way to go.

If you want the full power (and all the complexity) of compile-time meta-programming, you'll need to use an array macro.

</page>

<page url="https://www.uiua.org/docs/rows">

# [≡ rows](/docs/rows)

### Monadic modifier

Apply a function to each row of an array or arrays

This is the row-wise version of [∵ each](/docs/each).
  
```uiua
 /+ [1_2_3 4_5_6 7_8_9]  # Sum each row with the next
```

```output
[12 15 18]
```

```uiua
≡/+ [1_2_3 4_5_6 7_8_9]  # Sum the elements of each row
```

```output
[6 15 24]
```
  
The number of arrays used depends on how many arguments the function takes.

```uiua
≡/+ [1_2 3_4] 5_6 # One argument
```

```output
[5 6]
[3 7]
```

```uiua
≡⊂  [1_2 3_4] 5_6 # Two arguments
```

```output
╭─       
╷ 1 2 5  
  3 4 6  
        ╯
```
  
In general, when [≡ rows](/docs/rows) uses multiple arrays, the arrays must have the same number of rows.

```uiua
≡⊂ 1_2_3 4_5
```

```output
Error: Cannot ≡ rows arrays with different number of rows 3 and 2
  at 1:1
1 | ≡⊂ 1_2_3 4_5
    ─
```

However, if any of the arrays have exactly one row, then that row will be reused for each row of the other arrays.

Scalars are considered to have one row.

```uiua
≡⊂ 1_2_3 4
```

```output
╭─     
╷ 1 4  
  2 4  
  3 4  
      ╯
```

```uiua
≡⊂ 1 2_3_4
```

```output
╭─     
╷ 1 2  
  1 3  
  1 4  
      ╯
```

```uiua
≡(⊂⊂) 1 2_3_4 5
```

```output
╭─       
╷ 1 2 5  
  1 3 5  
  1 4 5  
        ╯
```

You can use [¤ fix](/docs/fix) to take advantage of this functionailty and re-use an entire array for each row of another.

```uiua
≡⊂ ¤  1_2_3 4_5_6
```

```output
╭─         
╷ 1 2 3 4  
  1 2 3 5  
  1 2 3 6  
          ╯
```

```uiua
≡⊂ ⊙¤ 1_2_3 4_5_6
```

```output
╭─         
╷ 1 4 5 6  
  2 4 5 6  
  3 4 5 6  
          ╯
```

[∧ fold](/docs/fold) also has this behavior.
  
[≡ rows](/docs/rows) is one of a few modifiers that uses [proxy values](/tutorial/functions#proxy).

</page>

<page url="https://www.uiua.org/docs/take">

# [↙ take](/docs/take)

### Dyadic function

Take the first n elements of an array

This is the opposite of [↘ drop](/docs/drop).
  
```uiua
↙ 3 [8 3 9 2 0]
```

```output
[8 3 9]
```

```uiua
↙ 2 ↯3_3⇡9
```

```output
╭─       
╷ 0 1 2  
  3 4 5  
        ╯
```

Negative amounts take from the end.

```uiua
↙ ¯3 [8 3 9 2 0]
```

```output
[9 2 0]
```

```uiua
↙ ¯2 ↯3_3⇡9
```

```output
╭─       
╷ 3 4 5  
  6 7 8  
        ╯
```

The amount to take can also be a list to take along multiple axes.

```uiua
.↯3_4⇡12
↙2_3   .
↙¯2_¯2 :
```

```output
╭─           
╷ 0 1  2  3  
  4 5  6  7  
  8 9 10 11  
            ╯
╭─       
╷ 0 1 2  
  4 5 6  
        ╯
╭─       
╷  6  7  
  10 11  
        ╯
```
  
By default, taking more than the length of the array will throw an error.

```uiua
↙7 [8 3 9 2 0]
```

```output
Error: Cannot take 7 rows from array with 5 rows outside a fill context
  at 1:1
1 | ↙7 [8 3 9 2 0]
    ─
```

If you would like to fill the excess length with some fill value, use [⬚ fill](/docs/fill).

```uiua
⬚π↙ 7 [8 3 9 2 0]
```

```output
[8 3 9 2 0 π π]
```

This works with negative values as well.

```uiua
⬚π↙ ¯7 [8 3 9 2 0]
```

```output
[π π 8 3 9 2 0]
```
  
[∞ infinity](/docs/infinity) can be used to take every row along an axis.

```uiua
↯2_3_4⇡24
↙¯1_∞_2.
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
╭─       
╷ 12 13  
╷ 16 17  
  20 21  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/&rb">

# [&rb](/docs/&rb) \- read to bytes

### Dyadic function

Read at most n bytes from a stream

Expects a count and a stream handle.

The stream handle `0` is stdin.

```uiua
&rb 4 &fo "example.txt"
```

```output
[84 104 105 115]
```

Using [∞ infinity](/docs/infinity) as the count will read until the end of the stream.

```uiua
&rb ∞ &fo "example.txt"
```

```output
[84 104 105 115 32 105 115 32 97 32 115 105 109 112 108 101 32 116 101 120 116 32 102 105 108 101 32 102 111 114 32 10 117 115 101 32 105 110 32 101 120 97 109 112 108 101 32 85 105 117 97 32 99 111 100 101 32 226 156 168]
```
  
See also: [&rs](/docs/&rs)

</page>

<page url="https://www.uiua.org/docs/windows">

# [◫ windows](/docs/windows)

### Dyadic function

The n-wise windows of an array

```uiua
◫2 .⇡4
```

```output
[0 1 2 3]
╭─     
╷ 0 1  
  1 2  
  2 3  
      ╯
```

```uiua
◫4 .⇡6
```

```output
[0 1 2 3 4 5]
╭─         
╷ 0 1 2 3  
  1 2 3 4  
  2 3 4 5  
          ╯
```
  
Multi-dimensional window sizes are supported.

```uiua
◫2_2 .[1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
╭─     
╷ 1 2  
╷ 4 5  
╷      
  2 3  
  5 6  
       
  4 5  
  7 8  
       
  5 6  
  8 9  
      ╯
```
  
Negative window sizes gives the absolute value number of windows.

```uiua
◫¯2 ↯4_4⇡16
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
   4  5  6  7  
   8  9 10 11  
  12 13 14 15  
              ╯
```

```uiua
◫¯3 ↯4_4⇡16
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
               
   4  5  6  7  
   8  9 10 11  
               
   8  9 10 11  
  12 13 14 15  
              ╯
```

This can be useful when you want to get horizontal windows.

```uiua
◫¯1_2 ↯4_4⇡16
```

```output
╭─       
╷  0  1  
╷  4  5  
╷  8  9  
  12 13  
         
   1  2  
   5  6  
   9 10  
  13 14  
         
   2  3  
   6  7  
  10 11  
  14 15  
        ╯
```
  
Usually, [◫ windows](/docs/windows) "materialzes" the windows. This means that the windows are copied into a new array. While this is very general, it can be slow and wasteful if you end up immediately reducing the windows.

For this reason, the pattern [≡](/docs/rows)[/](/docs/reduce)`F`[◫](/docs/windows) is optimized for scalar window sizes to [/ reduce](/docs/reduce) windows as they are generated.

```uiua
≡/+◫ 5 [1 8 2 9 3 0 2 4 4 5 1] # Fast!
```

```output
[23 22 16 18 13 15 16]
```
  
You can use [⬚ fill](/docs/fill) to pad the array with a value.

This can be useful for things like convolutions.

```uiua
+1↯2_3⇡6
⬚0◫2_3
≡≡□
```

```output
╭─                                                   
╷ ╓─        ╓─        ╓─        ╓─        ╓─         
  ╟ 0 0 0   ╟ 0 0 0   ╟ 0 0 0   ╟ 0 0 0   ╟ 0 0 0    
    0 0 1     0 1 2     1 2 3     2 3 0     3 0 0    
          ╜         ╜         ╜         ╜         ╜  
  ╓─        ╓─        ╓─        ╓─        ╓─         
  ╟ 0 0 1   ╟ 0 1 2   ╟ 1 2 3   ╟ 2 3 0   ╟ 3 0 0    
    0 0 4     0 4 5     4 5 6     5 6 0     6 0 0    
          ╜         ╜         ╜         ╜         ╜  
  ╓─        ╓─        ╓─        ╓─        ╓─         
  ╟ 0 0 4   ╟ 0 4 5   ╟ 4 5 6   ╟ 5 6 0   ╟ 6 0 0    
    0 0 0     0 0 0     0 0 0     0 0 0     0 0 0    
          ╜         ╜         ╜         ╜         ╜  
                                                    ╯
```

</page>

<page url="https://www.uiua.org/docs/multiply">

# [× multiply](/docs/multiply)

### Dyadic pervasive function

Multiply values

Formats from `*`.
  
```uiua
×3 5
```

```output
15
```

```uiua
×2 [1 2 3]
```

```output
[2 4 6]
```

```uiua
× [1 2 3] [4 5 6]
```

```output
[4 10 18]
```

```uiua
× [¯1 0 1] "hey"
```

```output
"Hey"
```
  
Uiua does not have dedicated boolean logical operators.

[× multiply](/docs/multiply) can be used as a logical AND.

```uiua
×,,⊓≥≤5,8 . [6 2 5 9 6 5 0 4]
```

```output
[6 2 5 9 6 5 0 4]
[1 1 1 0 1 1 1 1]
[1 0 1 1 1 1 0 0]
[1 0 1 0 1 1 0 0]
```

</page>

<page url="https://www.uiua.org/tutorial/patternmatching">

# Pattern Matching

Uiua has a powerful mechanism for matching patterns in arrays to conditionally extract data.

## [](#un-patterns)[° un](/docs/un) Patterns

[° un](/docs/un) can be applied to a constant value to form a function that throws an error if the top value on the stack does not match the constant.

```uiua
°5 5
```

```uiua
°5 3
```

```output
Error: Pattern match failed
  at 1:2
1 | °5 3
     ─
```

This works for arrays as well.

```uiua
°[1 2 3] [1 2 3]
```

```uiua
°[1 2 3] [4 5 6]
```

```output
Error: Pattern match failed
  at 1:2
1 | °[1 2 3] [4 5 6]
     ───────
```

This is not very useful on its own, but it can be composed with other inverses to form more complex patterns.

A primary pattern of note is using stack array notation with planet notation to form patterns that match arrays with certain values and extract the others.

```uiua
°[1⊙3] [1 2 3]
```

```output
2
```

```uiua
°[1⊙3] [4 5 6]
```

```output
Error: Pattern match failed
  at 1:2
1 | °[1⊙3] [4 5 6]
     ─────
```

These can be arbitrarily nested.

```uiua
°[1 2⊙⊙(5∘)] [1 2 3 4 5 6]
```

```output
6
4
3
```

[° un](/docs/un)[⊂ join](/docs/join) with a constant can also be used to match arrays with a certain prefix.

```uiua
°(⊂1) [1 2 3]
```

```output
[2 3]
```

```uiua
°(⊂1) [4 5 6]
```

```output
Error: Pattern match failed
  at 1:3
1 | °(⊂1) [4 5 6]
      ─
```

```uiua
°(⊂1_2) [1 2 3]
```

```output
[3]
```

To match a suffix, you can use [⍜ under](/docs/under)[⇌ reverse](/docs/reverse).

```uiua
⍜⇌°(⊂3) [1 2 3]
```

```output
[1 2]
```

## [Matching multiple patterns with ](#with-try)[⍣ try](/docs/try)

Single patterns are of limited usefulness on their own. Because they throw errors when matching fails, you can attempt to match additional errors using [⍣ try](/docs/try).

[⍣ try](/docs/try) accepts arbitrarily long function packs, so you can match as many patterns as you want in a simple way.

In this example, we run different code depending on which pattern matches.

```uiua
F ← ⍣(×10°[1⊙3]|°(⊂5)|⇌)
F [5 6 7]
F [1 2 3]
F "abc"
```

```output
[6 7]
20
"cba"
```

Having more or longer patterns may be easier to read if each pattern gets its own line.

```uiua
F ← ⍣(
  ×10 °[1⊙3]
| °(⊂5)
| ⇌
)
```

## [Format String Patterns](#format-string-patterns)

[° un](/docs/un) works with format strings to extract substrings where the `_`s are. While the [regex](/docs/regex) function is available, it is often more complex than is necessary. In these cases, format string patterns are more appropriate.

```uiua
°$"_, _, _" "1, 2, 3"
```

```output
"3"
"2"
"1"
```

```uiua
°$"_, _, _" "1, 2, 3, 4, 5"
```

```output
"3, 4, 5"
"2"
"1"
```

```uiua
°$"Hello, _!" "Hello, World!"
```

```output
"World"
```

More precisely, format string patterns form a regex that replaces all `_`s from the format string with `(.+?|.*)`, where `.` also matches newlines.

</page>

<page url="https://www.uiua.org/docs/dump">

# [dump](/docs/dump)

### Monadic 0-argument modifier

Debug print all the values currently on stack without popping them

The function is used to preprocess the values before printing.

[dump](/docs/dump)[∘ identity](/docs/identity) is equivalent to [? stack](/docs/stack).

```uiua
dump∘ 1 2 3
```

```output
┌╴dump 1:1
├╴3
├╴2
├╴1
└╴╴╴╴╴╴╴╴╴

3
2
1
```

This is useful when you want to inspect the current ordering of the stack.

For example, if you are juggling some values on the stack, you can use [dump](/docs/dump) to inspect the stack afterwards:

```uiua
1 2 3
,,⊙.:
dump∘
+×-×+
```

```output
┌╴dump 3:1
├╴3
├╴1
├╴1
├╴2
├╴1
├╴2
└╴╴╴╴╴╴╴╴╴

¯2
```

[dump](/docs/dump)[△ shape](/docs/shape) is useful if your raw array data isn't worth looking at, but the shapes are.

```uiua
2_3_10 17 ↯3_4⇡12
dump△
++
```

```output
┌╴dump 2:1
├╴[3 4]
├╴[]
├╴[3]
└╴╴╴╴╴╴╴╴╴

╭─             
╷ 19 20 21 22  
  24 25 26 27  
  35 36 37 38  
              ╯
```

```uiua
↯¯1_5 ⇡30
⍉.⊃≡(⊟.)(⊞+.).
dump△
+++∩∩⧻
```

```output
┌╴dump 3:1
├╴[1 5]
├╴[1 1 5]
├╴[1 2 5]
├╴[2 5 1]
└╴╴╴╴╴╴╴╴╴

5
```

Errors encountered within [dump](/docs/dump)'s function are caught and dumped as strings.

```uiua
1_2_3 [] 5_6_7
dump⊢
```

```output
┌╴dump 2:1
├╴5
├╴"2:5: Cannot take first of an empty array"
├╴1
└╴╴╴╴╴╴╴╴╴

[5 6 7]
[]
[1 2 3]
```

</page>

<page url="https://www.uiua.org/tutorial/advancedstack">

# Advanced Stack Manipulation

Uiua does not have local variables. With only [. duplicate](/docs/duplicate), [: flip](/docs/flip), and [, over](/docs/over), how do you work with more than 2 values at a time?

## [](#fork)[⊃ fork](/docs/fork)

[⊃ fork](/docs/fork) is a dyadic modifier that takes 2 functions and calls them both on the same set of arguments. The number of arguments used is the maximum of the two functions.

```uiua
[⊃+× 3 5]
```

```output
[8 15]
```

If one of the functions takes more arguments than the other, the function with fewer arguments uses the top-most values.

```uiua
⊃×⇌ [1 2 3] 10
```

```output
[3 2 1]
[10 20 30]
```

What's powerful about [⊃ fork](/docs/fork) is that it can be chained to use as many functions as you want.

```uiua
[⊃⊃⊃+-×÷ 5 8]
```

```output
[13 3 40 1.6]
```

[⊃ fork](/docs/fork) is also good because it does not require that its values be in an array together, so they can be different shapes or types.

```uiua
⊃+- 1 @b
```

```output
@a
@c
```

```uiua
⊃⊃⊃↻↙↘⊡ 2 [1 2 3 4 5]
```

```output
3
[3 4 5]
[1 2]
[3 4 5 1 2]
```

We'll see just how important [⊃ fork](/docs/fork) is later in this section.

## [](#both)[∩ both](/docs/both)

[∩ both](/docs/both) is a monadic modifier and a sort of complement to [⊃ fork](/docs/fork). While [⊃ fork](/docs/fork) calls multiple functions on the same set of arguments, [∩ both](/docs/both) calls a _single_ function on _multiple_ sets of arguments.

```uiua
∩⇌ [1 2 3] [4 5 6]
```

```output
[6 5 4]
[3 2 1]
```

Chaining [∩ both](/docs/both) doubles the number of arguments each time.

```uiua
∩∩⇌ [1 2 3] [4 5 6] [7 8 9] [10 11 12]
```

```output
[12 11 10]
[9 8 7]
[6 5 4]
[3 2 1]
```

## [](#bracket)[⊓ bracket](/docs/bracket)

To round off the trio, we have [⊓ bracket](/docs/bracket), which is a dyadic modifier that calls each of its functions on a different set of arguments.

```uiua
[⊓+× 1 2 3 4]
```

```output
[3 12]
```

[⊓ bracket](/docs/bracket) too can be chained. Each additional function is called on arguments deeper in the stack.

```uiua
[⊓⊓⊓+¯×. 1 2 3 4 5 6]
```

```output
[3 ¯3 20 6 6]
```

## [Function Packs](#function-packs)

All dyadic modifiers allow a special notation with a single set of `()`s with a `|` in the middle separating the functions. This is called a _function pack_.

```uiua
⊓(+|×) 1 2 3 4
```

```output
12
3
```

While all dyadic modifiers can use function packs, [⊃ fork](/docs/fork) and [⊓ bracket](/docs/bracket) allow more than 2 functions to be used. This can sometimes be shorter and/or more readable than chaining the modifier.

```uiua
[⊃(+|-|×|÷) 5 8]
```

```output
[13 3 40 1.6]
```

```uiua
[⊓(+1|×|÷2) 5 10 12 22]
```

```output
[6 120 11]
```

## [](#dip-gap)[⊙ dip](/docs/dip) and [⋅ gap](/docs/gap)

The [⊙ dip](/docs/dip) modifier temporarily pops the top value on the stack, calls its function, then pushes the value back.

```uiua
[⊙+ 1 2 3]
```

```output
[1 5]
```

[⊙ dip](/docs/dip) can be chained to dig deeper into the stack, though try not to dig _too_ deep, as it makes code harder to read.

```uiua
[⊙⊙⊙⊙⊙⊙+ 1 2 3 4 5 6 7 8]
```

```output
[1 2 3 4 5 6 15]
```

One use of [⊙ dip](/docs/dip) is to collect values from the stack into an array. Here, a chain of [⊙ dip](/docs/dip)s are terminated with [∘ identity](/docs/identity).

```uiua
[⊙⊙⊙∘] 1 2 3 4 5
```

```output
5
[1 2 3 4]
```

```uiua
{⊙⊙∘} 1 2_3 "wow"
```

```output
{1 [2 3] "wow"}
```

[⋅ gap](/docs/gap) _discards_ the top value on the stack and calls its function.

```uiua
⋅+ 1 2 3
```

```output
5
```

But wait, [◌ pop](/docs/pop) exists! Why would you need this?

## [🌍 Planet Notation 🪐](#planet-notation)

The main reason for [⊙ dip](/docs/dip) and [⋅ gap](/docs/gap) to exist is to be chained with [∘ identity](/docs/identity), often inside of [⊃ fork](/docs/fork). They act as a sort of boolean selector to choose which arguments to keep and which to discard in a branch.

This is called _planet notation_ because it looks like the planets in a solar system chart.

For example, let's say you want to [× multiply](/docs/multiply) the 2nd and 4th arguments on the stack and discard the rest:

```uiua
×⋅⊙⋅∘ 1 2 3 4
```

```output
8
```

Notice how the circles correspond to the stack arguments we want.

Maybe you want to [+ add](/docs/add) 3 numbers but keep the second 2 on the stack:

```uiua
[⊃⋅⊙∘(++)] 2 5 10
```

```output
[5 10 17]
```

You can read [⋅](/docs/gap)[⊙](/docs/dip)[∘](/docs/identity) as "discard argument 1, keep argument 2, keep argument 3."

If you only wanted to keep argument 2, you simply make the expression shorter:

```uiua
[⊃⋅∘(++)] 2 5 10
```

```output
[5 17]
```

For a more useful example, let's do a complex mathematical expression. We will implement this function (shown here in mathematical notation):

```
f(a,b,c,x) = (a+x)(bx-c)
```

We'll start with the `(a + x)` part. We can grab `a` and `x` with [⊙ dip](/docs/dip) and [∘ identity](/docs/identity), and ignore `b` and `c` with [⋅ gap](/docs/gap).

```uiua
+⊙⋅⋅∘ 1 2 3 4
```

```output
5
```

Next, we'll do the `(bx-c)` part. We can grab each term with [⊃ fork](/docs/fork).

```uiua
-⊃(⋅⋅∘)(×⋅⊙⋅∘) 1 2 3 4
```

```output
5
```

The first pair of `()`s is not actually necessary, so let's remove them.

```uiua
-⊃⋅⋅∘(×⋅⊙⋅∘) 1 2 3 4
```

```output
5
```

Finally, we can combine the two parts with another [⊃ fork](/docs/fork).

```uiua
×⊃(+⊙⋅⋅∘)(-⊃⋅⋅∘(×⋅⊙⋅∘)) 1 2 3 4
```

```output
25
```

If you like, you can factor out the [⋅ gap](/docs/gap) in the second part

```uiua
×⊃(+⊙⋅⋅∘)⋅(-⊃⋅∘(×⊙⋅∘)) 1 2 3 4
```

```output
25
```

Alternatively, you can use a function pack.

```uiua
×⊃(+⊙⋅⋅∘|-⊃⋅⋅∘(×⋅⊙⋅∘)) 1 2 3 4
```

```output
25
```

And there you have it! A readable syntax juggling lots of values without any names!

It's annoying to write long lists of names like `gapdipgapgapide`, so those three functions (plus [◌ pop](/docs/pop)) have a special rule in the parser that allows you to write them with only 1 character as long as there are at least 2 characters in the sequence. Also, 'i' and 'p' for [∘ identity](/docs/identity) and [◌ pop](/docs/pop) only work if they are the last character.

Try it out!

```uiua
+gdggi 1 2 3 4 5
```

```output
7
```

```uiua
+dggdp 1 2 3 4 5
```

```output
5
```

In general, planet notation as complex as the mathematical function example above should only be used when it is necessary. For examples like that with 4+ values, it is. However, when working with fewer values, you can get very far with just [. duplicate](/docs/duplicate) and [: flip](/docs/flip). Maybe sprinkle some [, over](/docs/over)s and [⊙ dip](/docs/dip)s in there too.

## [](#on-and-by)[⟜ on](/docs/on) and [⊸ by](/docs/by)

As you write more Uiua code, you'll find that there is a kind of pattern you'll encounter over and over again. It involves calling a function, then calling another function that re-uses an argument to the first function.

One simple example is getting `n` numbers between `0` and `1`. One way you may think to solve this is with [. duplicate](/docs/duplicate) and [: flip](/docs/flip).

```uiua
÷:⇡. 5
```

```output
Style: Prefer ⟜ over : . here
  at 1:2
1 | ÷:⇡. 5
     ───

[0 0.2 0.4 0.6 0.8]

```

This solution works, but as the style diagnostic suggests, it is not quite idiomatic.

When the first function you call is dyadic, it can get a little trickier. For example, if you wanted to get all the integers between two numbers, you may try either of the following:

```uiua
+⇡-,: 3 8
+⊃∘(⇡-) 3 8
```

```output
Style: Prefer `⟜:` over `,:` for clarity
  at 1:4
1 | +⇡-,: 3 8
       ──
Style: Prefer `⟜` over `⊃∘` for clarity
  at 2:2
2 | +⊃∘(⇡-) 3 8
     ──

[3 4 5 6 7]
[3 4 5 6 7]

```

Again, as the style diagnostics tell you, there is a better way.

The [⟜ on](/docs/on) modifier calls a function but keeps its first argument on top of the stack. This can be used in both of the above examples.

```uiua
÷⟜⇡ 5
```

```output
[0 0.2 0.4 0.6 0.8]
```

```uiua
+⟜(⇡-) 3 8
```

```output
[3 4 5 6 7]
```

Having a single glyph for something that can be written as simply [⊃](/docs/fork)[∘](/docs/identity) may seem unnecessary, but you'll find that because the pattern is so common, it makes code easier to both read and write.

The [⊸ by](/docs/by) modifier is similar. Instead of keeping the first argument on top of the stack, it keeps the last argument below the function's outputs.

```uiua
÷⊸⧻ [1 2 3 4]
```

```output
[0.25 0.5 0.75 1]
```

```uiua
▽⊸> 5 [1 8 4 9 2 8 4]
```

```output
[8 9 8]
```

</page>

<page url="https://www.uiua.org/docs/send">

# [send](/docs/send)

### Dyadic 0-output function

Send a value to a thread

Expects a thread id returned by [spawn](/docs/spawn) or [pool](/docs/pool) and a value to send.

The thread id `0` corresponds to the parent thread.

The sent-to thread can receive the value with [recv](/docs/recv) or [tryrecv](/docs/tryrecv).

</page>

<page url="https://www.uiua.org/docs/deduplicate">

# [◴ deduplicate](/docs/deduplicate)

### Monadic function

Remove duplicate elements from an array

```uiua
◴ 7_7_8_0_1_2_0
```

```output
[7 8 0 1 2]
```

```uiua
◴ "Hello, World!"
```

```output
"Helo, Wrd!"
```

```uiua
◴ [3_2 1_4 3_2 5_6 1_4 7_8]
```

```output
╭─     
╷ 3 2  
  1 4  
  5 6  
  7 8  
      ╯
```

</page>

<page url="https://www.uiua.org/docs/combinators">

# Combinators

This page contains a list of implementations of common combinators in Uiua. While it's not really necessary to know these to write Uiua programs, you may find the information interesting.

A combinator is a function that only refers to its arguments. [Combinatory logic](https://en.wikipedia.org/wiki/Combinatory%5Flogic) is the branch of logic that deals with combinators.

Ever since Raymond Smullyan's book [To Mock a Mockingbird](https://en.wikipedia.org/wiki/To%5FMock%5Fa%5FMockingbird), people have been calling combinators by bird names. These bird names are included in the table.

## [Reading the Table](#reading)

Each entry in the table contains a diagram of the combinator. The letters `F`, `G`, and `H` represent the first, second, and third functions involved in the combinator. The letters `a`, `b`, `c`, and `d` represent the arguments.

For the purpose of the examples, `a` is always the array `1_2_3`, `b` is always the array `4_5_6`, etc.

The left-most function in the example stands in for `F`, the "top-most" function in the combinator.
  
---
  
| Sym. | Bird             | Code                                                                | Example                                                                                      | Diagram |
| ---- | ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------- |
| I    | Identity         | [∘ identity](/docs/identity)                                        | ∘ 1\_2\_3  \[1 2 3\]                                                                         | 🔗      |
| K    | Kestrel          | [⊙](/docs/dip)[◌](/docs/pop)                                        | ⊙◌ 1\_2\_3 4\_5\_6  \[1 2 3\]                                                                | 🔗      |
| KI   | Kite             | [◌](/docs/pop) or [⋅](/docs/gap)[∘](/docs/identity)                 | ◌ 1\_2\_3 4\_5\_6   ⋅∘ 1\_2\_3 4\_5\_6  \[4 5 6\] \[4 5 6\]                                  | 🔗      |
| W    | Warbler          | [. duplicate](/docs/duplicate)                                      | ⊂. 1\_2\_3  \[1 2 3 1 2 3\]                                                                  | 🔗      |
| C    | Cardinal         | [: flip](/docs/flip)                                                | ⊂: 1\_2\_3 4\_5\_6  \[4 5 6 1 2 3\]                                                          | 🔗      |
| B    | Bluebird         | ⊢⇌ 1\_2\_3  3                                                       | 🔗                                                                                           |         |
| B1   | Blackbird        | ⇌⊂ 1\_2\_3 4\_5\_6  \[6 5 4 3 2 1\]                                 | 🔗                                                                                           |         |
| S    | Starling         | [⟜ on](/docs/on)                                                    | ⊂⟜¯ 1\_2\_3  \[1 2 3 ¯1 ¯2 ¯3\]                                                              | 🔗      |
| Σ    | Violet Starling  | [. duplicate](/docs/duplicate)                                      | ≍⇌. 1\_2\_3  0                                                                               | 🔗      |
| D    | Dove             | [⊙ dip](/docs/dip)                                                  | ⊟⊙⇌ 1\_2\_3 4\_5\_6  ╭─        ╷ 1 2 3     6 5 4           ╯                                 | 🔗      |
| Δ    | Zebra Dove       | ⊟⇌ 1\_2\_3 4\_5\_6  ╭─        ╷ 3 2 1     4 5 6           ╯         | 🔗                                                                                           |         |
| Φ    | Phoenix          | [⊃ fork](/docs/fork)                                                | ⊟⊃¯⇌ 1\_2\_3  ╭─           ╷ ¯1 ¯2 ¯3      3  2  1              ╯                            | 🔗      |
| Ψ    | Psi              | [∩ both](/docs/both)                                                | ⊂∩□ 1\_2\_3 4\_5\_6  {\[1 2 3\] \[4 5 6\]}                                                   | 🔗      |
| D2   | Dovekie          | [⊓ bracket](/docs/bracket)                                          | ⊟⊓¯⇌ 1\_2\_3 4\_5\_6  ╭─           ╷ ¯1 ¯2 ¯3      6  5  4              ╯                    | 🔗      |
| N \* | Eastern Nicator  | [⟜ on](/docs/on)                                                    | ⊟⟜+ 1\_2\_3 4\_5\_6  ╭─        ╷ 1 2 3     5 7 9           ╯                                 | 🔗      |
| ν \* | Western Nicator  | [⊸ by](/docs/by)                                                    | ⊟⊸+ 1\_2\_3 4\_5\_6  ╭─        ╷ 5 7 9     4 5 6           ╯                                 | 🔗      |
| E    | Eagle            | [⊙ dip](/docs/dip)                                                  | ⊟⊙+ 1\_2\_3 4\_5\_6 7\_8\_9  ╭─           ╷  1  2  3     11 13 15              ╯             | 🔗      |
| ε    | Golden Eagle     | ⊟+ 1\_2\_3 4\_5\_6 7\_8\_9  ╭─        ╷ 5 7 9     7 8 9           ╯ | 🔗                                                                                           |         |
| X \* | Eastern Kingbird | [⊃ fork](/docs/fork)                                                | ⊟⊃¯+ 1\_2\_3 4\_5\_6  ╭─           ╷ ¯1 ¯2 ¯3      5  7  9              ╯                    | 🔗      |
| χ \* | Western Kingbird | [⊃ fork](/docs/fork)                                                | ⊟⊃+¯ 1\_2\_3 4\_5\_6  ╭─           ╷  5  7  9     ¯1 ¯2 ¯3              ╯                    | 🔗      |
| R \* | Eastern Parotia  | [⊓ bracket](/docs/bracket)                                          | ⊟⊓¯+ 1\_2\_3 4\_5\_6 7\_8\_9  ╭─           ╷ ¯1 ¯2 ¯3     11 13 15              ╯            | 🔗      |
| ρ \* | Western Parotia  | [⊓ bracket](/docs/bracket)                                          | ⊟⊓+¯ 1\_2\_3 4\_5\_6 7\_8\_9  ╭─           ╷  5  7  9     ¯7 ¯8 ¯9              ╯            | 🔗      |
| Φ1   | Pheasant         | [⊃ fork](/docs/fork)                                                | ⊟⊃+- 1\_2\_3 4\_5\_6  ╭─        ╷ 5 7 9     3 3 3           ╯                                | 🔗      |
| Ê    | Bald Eagle       | [⊓ bracket](/docs/bracket)                                          | ⊟⊓-+ 1\_2\_3 4\_5\_6 7\_8\_9 10\_11\_12  ╭─           ╷  3  3  3     17 19 21              ╯ | 🔗      |

This page is inspired by the [similar page](https://mlochbaum.github.io/BQN/doc/birds.html) on the BQN website. The diagrams are also inspired by [BQN's combinator diagrams](https://mlochbaum.github.io/BQN/doc/tacit.html#combinators).

I referenced [these](https://combinatorylogic.com/table.html) [lists](https://www.angelfire.com/tx4/cus/combinator/birds.html) of combinators when making this page.

</page>

<page url="https://www.uiua.org/docs/gap">

# [⋅ gap](/docs/gap)

### Monadic modifier

Discard the top stack value then call a function

See the [Advanced Stack Manipulation Tutorial](/tutorial/advancedstack) for a more complete understanding of why [⋅ gap](/docs/gap) is useful.
  
```uiua
⋅+ 1 2 3
```

```output
5
```

This may seem useless when [◌ pop](/docs/pop) exists, but [⋅ gap](/docs/gap) really shines when used with [⊃ fork](/docs/fork).

In a [⊃ fork](/docs/fork) expression, you can use [⊙ dip](/docs/dip), [⋅ gap](/docs/gap), and [∘ identity](/docs/identity) to select out values.

For example, if you wanted to add 3 values but keep the last value on top of the stack:

```uiua
[⊃⋅⋅∘(++) 3 5 10]
```

```output
[10 18]
```

By using fewer [⋅](/docs/gap)s, you can select a different value.

```uiua
[⊃⋅∘(++) 3 5 10]
```

```output
[5 18]
```

```uiua
[⊃∘(++) 3 5 10]
```

```output
Style: Prefer `⟜` over `⊃∘` for clarity
  at 1:2
1 | [⊃∘(++) 3 5 10]
     ──

[3 18]

```

By replacing a [⋅](/docs/gap) with a [⊙](/docs/dip), you keep the argument in that spot instead of popping it:

```uiua
[⊃⊙⋅∘(++) 3 5 10]
```

```output
[3 10 18]
```

```uiua
[⊃⋅⊙∘(++) 3 5 10]
```

```output
[5 10 18]
```

```uiua
[⊃⊙⊙∘(++) 3 5 10]
```

```output
[3 5 10 18]
```

</page>

<page url="https://www.uiua.org/docs/eta">

# [η eta](/docs/eta)

### Constant

The number of radians in a quarter circle

Equivalent to [÷](/docs/divide)`2`[π](/docs/pi) or [÷](/docs/divide)`4`[τ](/docs/tau)

```uiua
[η ÷2π ÷4τ]
```

```output
[η η η]
```

</page>

<page url="https://www.uiua.org/docs/&ae">

# [&ae](/docs/&ae) \- audio - encode

### Triadic function

Encode audio into a byte array

The first argument is the format, the second is the audio sample rate, and the third is the audio samples.
  
The sample rate must be a positive integer.
  
The audio samples must be a rank 1 or 2 numeric array.
  
A rank 1 array is a list of mono audio samples.

For a rank 2 array, each row is a channel.
  
The samples must be between -1 and 1.

The sample rate is [&asr](/docs/&asr).
  
You can decode a byte array into audio with [° un](/docs/un)[&ae](/docs/&ae).

This returns the audio format as a string, the audio sample rate, and an array representing the audio samples.
  
Currently, only the `wav` format is supported.
  
This simple example will load an audio file, halve its sample rate, and re-encode it.

```uiua
⍜(°&ae &frab "test.wav")⊙⊓(⌊÷2|▽0.5)
```

```output
Error: File not found: test.wav
  at 1:8
1 | ⍜(°&ae &frab "test.wav")⊙⊓(⌊÷2|▽0.5)
           ─────
```
  
See also: [&ap](/docs/&ap)

</page>

<page url="https://www.uiua.org/docs/rise">

# [⍏ rise](/docs/rise)

### Monadic function

Get the indices into an array if it were sorted ascending

The [⍏ rise](/docs/rise) of an array is the list of indices that would sort the array ascending if used with [⊏ select](/docs/select).

```uiua
⍏ 6_2_7_0_¯1_5
```

```output
[4 3 1 5 0 2]
```

Using the [⍏ rise](/docs/rise) as a selector in [⊏ select](/docs/select) yields the sorted array.

```uiua
⊏⍏. 6_2_7_0_¯1_5
```

```output
[¯1 0 2 5 6 7]
```

```uiua
⊏⊸⍏ 6_2_7_0_¯1_5
```

```output
[¯1 0 2 5 6 7]
```

If we transform the array before [⍏ rise](/docs/rise)ing, we can sort by a key.

Here, we sort the array ascending by the [⌵ absolute value](/docs/absolute value) of its elements.

```uiua
⊏⍏⌵. 6_2_7_0_¯1_5
```

```output
[0 ¯1 2 5 6 7]
```
  
[⊢ first](/docs/first)[⍏ rise](/docs/rise) and [⊢ first](/docs/first)[⇌ reverse](/docs/reverse)[⍏ rise](/docs/rise) are optimized in the interpreter to be O(n).

</page>

<page url="https://www.uiua.org/docs/over">

# [, over](/docs/over)

### Dyadic 3-output function

Duplicate the second-to-top value to the top of the stack

```uiua
[, 1 2 3 4 5]
```

```output
[2 1 2 3 4 5]
```
  
[, over](/docs/over) is often used in examples of functions with two inputs to show both inputs and the output.

```uiua
[+,, +3 4 5]
```

```output
[12 7 5]
```

</page>

<page url="https://www.uiua.org/docs/fill">

# [⬚ fill](/docs/fill)

### Dyadic modifier

Set the fill value for a function

By default, some operations require that arrays' [△ shape](/docs/shape)s are in some way compatible.

[⬚ fill](/docs/fill) allows you to specify a value that will be used to extend the shape of one or both of the operands to make an operation succeed.

The function is modified to take a fill value which will be used to fill in shapes.
  
A list of all [⬚ fill](/docs/fill)\-compatible functions can be found [below](#fills).
  
```uiua
⬚0[1 2_3_4 5_6]
```

```output
╭─       
╷ 1 0 0  
  2 3 4  
  5 6 0  
        ╯
```

```uiua
⬚10+ [1 2 3 4] [5 6]
```

```output
[6 8 13 14]
```

```uiua
⬚0≡⇡ [3 6 2]
```

```output
╭─             
╷ 0 1 2 0 0 0  
  0 1 2 3 4 5  
  0 1 0 0 0 0  
              ╯
```

A fill value can be pulled from the stack with [∘ identity](/docs/identity).

```uiua
⬚∘[1 2_3_4] 0
```

```output
╭─       
╷ 1 0 0  
  2 3 4  
        ╯
```

```uiua
⬚∘+ ∞ [1 2] [3 4 5 6]
```

```output
[4 6 ∞ ∞]
```
  
Beware that [⬚ fill](/docs/fill) nullifies [¤ fix](/docs/fix) for use in repeating a value multiple times in loops.

```uiua
  ≡⊂¤ [1 2 3] [4 5]
⬚0≡⊂¤ [1 2 3] [4 5]
```

```output
╭─         
╷ 1 2 3 4  
  1 2 3 5  
          ╯
╭─         
╷ 1 2 3 4  
  0 0 0 5  
          ╯
```

This is because [¤ fix](/docs/fix) works by making an array with 1 row, but [⬚ fill](/docs/fill) tries to make the [⧻ length](/docs/length)s match.

To get the expected behavior, use [□ box](/docs/box) and [◇ content](/docs/content) instead of [¤ fix](/docs/fix).

```uiua
⬚0≡◇⊂□ [1 2 3] [4 5]
```

```output
╭─         
╷ 1 2 3 4  
  1 2 3 5  
          ╯
```
  
Fill values are temporarily removed for the body of looping modifiers that can use them to fix their row shapes.

These include [/ reduce](/docs/reduce), [\\ scan](/docs/scan), [≡ rows](/docs/rows), [∵ each](/docs/each), [⊜ partition](/docs/partition), and [⊕ group](/docs/group).

```uiua
⬚0≡(↙3) [3 4]
```

```output
Error: Cannot take 3 rows from array with 1 row outside a fill context
  at 1:5
1 | ⬚0≡(↙3) [3 4]
        ─
  in fn from 1:4 at 1:3
  in fn from 1:3 at 1:1
```

[° un](/docs/un)[◌ pop](/docs/pop) can be used to retrieve the fill value. This ignores loop nesting and so can be used to "pull" the fill into the loop.

```uiua
⬚0≡(⬚°◌↙3) [3 4]
```

```output
╭─       
╷ 3 0 0  
  4 0 0  
        ╯
```
  
Fill values cannot cross the boundary of a named function call.

```uiua
⬚0/⊂ [1 2 3]
F ← /⊂
⬚0F [1 2 3]
```

```output
[0 1 2 3]
[1 2 3]
```

[° un](/docs/un)[◌ pop](/docs/pop) _can_ get the fill value through the function call. This means you can use [⬚ fill](/docs/fill)[° un](/docs/un)[◌ pop](/docs/pop) to get the fill value into a function.

```uiua
F ← ⬚°◌/⊂
⬚0F [1 2 3]
```

```output
[0 1 2 3]
```

This property includes stack macros, but _not_ array macros.
  
[⬚ fill](/docs/fill)[◌ pop](/docs/pop) can be used to temporarily remove the fill value.

```uiua
⬚0  ↻ 2 [1 2 3 4 5]
⬚0⬚◌↻ 2 [1 2 3 4 5]
```

```output
[3 4 5 0 0]
[3 4 5 1 2]
```

This _does_ affect [° un](/docs/un)[◌ pop](/docs/pop).

```uiua
⬚0  °◌
```

```output
0
```

```uiua
⬚0⬚◌°◌
```

```output
Error: No fill set
  at 1:6
1 | ⬚0⬚◌°◌
         ─
  in fn from 1:5 at 1:3
  in fn from 1:3 at 1:1
```
  
[⬚ fill](/docs/fill) and [° un](/docs/un)[◌ pop](/docs/pop) can be used to make a sort of ad-hoc variable system.

```uiua
a ← (°□⊡0°◌)
b ← (°□⊡1°◌)
c ← (°□⊡2°◌)
⬚{⊙⊙∘}(×b+c×a a) 2 3 4
```

```output
24
```

## [](#fills)[⬚ fill](/docs/fill)\-compatible functions

| Function                       | Notes                                                                 | Example                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Pervasive Dyadics              | ⬚10+ \[1 2\] \[3 4 5 6\]\[4 6 15 16\]                                 |                                                                                                         |
| Arrays                         | ⬚0\[1 2\_3\_4 5\_6\]╭─        ╷ 1 0 0     2 3 4     5 6 0           ╯ |                                                                                                         |
| [⊢ first](/docs/first)         | Default scalar for empty array                                        | ⬚5⊢ \[\]5                                                                                               |
| [⋕ parse](/docs/parse)         | Default for non-number strings                                        | ⬚10⋕ {"1" "2" "dog"}\[1 2 10\]                                                                          |
| [⊟ couple](/docs/couple)       | Matches shapes                                                        | ⬚0⊟ \[1 2 3 4\] \[5 6\]╭─          ╷ 1 2 3 4     5 6 0 0             ╯                                  |
| [⊂ join](/docs/join)           | Makes shapes work                                                     | ⬚0⊂ \[1\_2 3\_4\] \[5 6 7\]╭─        ╷ 1 2 0     3 4 0     5 6 7           ╯                            |
| [▽ keep](/docs/keep)           | Fills mask                                                            | ⬚0▽ \[1 0 1\] "abcdef""ac"                                                                              |
| [⊡ pick](/docs/pick)           | Out-of-bounds default                                                 | ⬚10⊡ 5 \[1 2 3\]10                                                                                      |
| [⊏ select](/docs/select)       | Out-of-bounds default                                                 | ⬚10⊏ 5 \[1 2 3\]10                                                                                      |
| [↙ take](/docs/take)           | Out-of-bounds default                                                 | ⬚0↙5 \[1 2 3\]\[1 2 3 0 0\]                                                                             |
| [↯ reshape](/docs/reshape)     | Fills excess elements                                                 | ⬚0↯ 2\_4 \[1 2 3\]╭─          ╷ 1 2 3 0     0 0 0 0             ╯                                       |
| [↻ rotate](/docs/rotate)       | Fills instead of wrapping                                             | ⬚0↻ 2 \[1 2 3 4 5\]\[3 4 5 0 0\]                                                                        |
| [/ reduce](/docs/reduce)       | Sets initial value                                                    | ⬚10/+ \[1 2 3\]16                                                                                       |
| [\\ scan](/docs/scan)          | Fills row shapes                                                      | ⬚10\\⊂ \[1 2 3\]╭─          ╷ 1 10 10     1  2 10     1  2  3             ╯                             |
| [≡ rows](/docs/rows)           | Fills row shapes                                                      | ⬚0≡⇡ \[4 7 3\]╭─                ╷ 0 1 2 3 0 0 0     0 1 2 3 4 5 6     0 1 2 0 0 0 0                   ╯ |
| [∵ each](/docs/each)           | Fills row shapes                                                      | ⬚0∵⇡ \[3\_2 2\_4\]╭─          ╷ 0 1 2 0   ╷ 0 1 0 0                 0 1 0 0     0 1 2 3             ╯   |
| [⊜ partition](/docs/partition) | Fills row shapes                                                      | ⬚@ ⊜∘ ≠@ . "Hey there"╭─          ╷ "Hey  "     "there"             ╯                                   |
| [⊜ partition](/docs/partition) | Sets initial value                                                    | ⬚"- "⊜⊂ ≠@ . "Hello world!""- Helloworld!"                                                              |
| [⊕ group](/docs/group)         | Fills row shapes                                                      | ⬚0⊕∘ ◿3\. \[1 8 4 9 3 8 2\]╭─        ╷ 9 3 0     1 4 0     8 8 2           ╯                            |
| [⊕ group](/docs/group)         | Sets initial value                                                    | ⬚\[\]⊕⊂ ◿3\. \[1 8 4 9 3 8 2\]\[9 3 1 4 8 8 2\]                                                         |
| [°](/docs/un)[◌](/docs/pop)    | Get fill value                                                        | ⬚5°◌5                                                                                                   |

</page>

<page url="https://www.uiua.org/docs/bits">

# [⋯ bits](/docs/bits)

### Monadic function

Encode an array as bits (LSB-first)

The result will always be 1 rank higher than the input.

```uiua
⋯27
```

```output
[1 1 0 1 1]
```

```uiua
⋯⇡8
```

```output
╭─       
╷ 0 0 0  
  1 0 0  
  0 1 0  
  1 1 0  
  0 0 1  
  1 0 1  
  0 1 1  
  1 1 1  
        ╯
```

```uiua
⋯[1_2 3_4 5_6]
```

```output
╭─       
╷ 1 0 0  
╷ 0 1 0  
         
  1 1 0  
  0 0 1  
         
  1 0 1  
  0 1 1  
        ╯
```
  
[° un](/docs/un)[⋯ bits](/docs/bits) can be used to decode the bits back into numbers.

```uiua
°⋯ [1 0 1]
```

```output
5
```

```uiua
°⋯ [0 1 1 0 1]
```

```output
22
```

```uiua
°⋯ [[0 1 1]
    [1 0 0]
    [1 1 0]]
```

```output
[6 1 3]
```
  
[⍜ under](/docs/under)[⋯ bits](/docs/bits) can be used to perform bit-wise operations.

```uiua
⍜⋯(¬⬚0↙8) 5
```

```output
250
```

</page>

<page url="https://www.uiua.org/docs/parse">

# [⋕ parse](/docs/parse)

### Monadic function

Parse a string as a number

```uiua
⋕ "17"
```

```output
17
```

```uiua
⋕ "3.1415926535897932"
```

```output
π
```

```uiua
⋕ "1/2"
```

```output
0.5
```

```uiua
⋕ "dog"
```

```output
Error: Cannot parse into number: invalid float literal
  at 1:1
1 | ⋕ "dog"
    ─
```
  
[⋕ parse](/docs/parse) is semi-pervasive. It works on multidimensional arrays of characters or boxes.

```uiua
⋕ {"5" "24" "106"}
```

```output
[5 24 106]
```

```uiua
⋕ .↯3_4 "012"
```

```output
╭─        
╷ "0120"  
  "1201"  
  "2012"  
         ╯
[120 1201 2012]
```
  
[° un](/docs/un)[⋕ parse](/docs/parse) will convert a scalar number into a string.

```uiua
°⋕ 58
```

```output
"58"
```

```uiua
°⋕ 6.283185307179586
```

```output
"6.283185307179586"
```

[° un](/docs/un)[⋕ parse](/docs/parse) on a non-scalar number array will [□ box](/docs/box) each string.

```uiua
°⋕ 1_2_3
```

```output
{"1" "2" "3"}
```

```uiua
°⋕ ↯3_4⇡12
```

```output
╭─                   
╷ ⌜0⌟ ⌜1⌟ ⌜2⌟  ⌜3⌟   
  ⌜4⌟ ⌜5⌟ ⌜6⌟  ⌜7⌟   
  ⌜8⌟ ⌜9⌟ ⌜10⌟ ⌜11⌟  
                    ╯
```
  
[⬚ fill](/docs/fill)[⋕ parse](/docs/parse) sets a default value for failed parses.

```uiua
⬚5⋕ {"13" "124" "not a number"}
```

```output
[13 124 5]
```

</page>

<page url="https://www.uiua.org/docs/fall">

# [⍖ fall](/docs/fall)

### Monadic function

Get the indices into an array if it were sorted descending

The [⍖ fall](/docs/fall) of an array is the list of indices that would sort the array descending if used with [⊏ select](/docs/select).

```uiua
⍖ 6_2_7_0_¯1_5
```

```output
[2 0 5 1 3 4]
```

Using the [⍖ fall](/docs/fall) as a selector in [⊏ select](/docs/select) yields the sorted array.

```uiua
⊏⍖. 6_2_7_0_¯1_5
```

```output
[7 6 5 2 0 ¯1]
```

```uiua
⊏⊸⍖ 6_2_7_0_¯1_5
```

```output
[7 6 5 2 0 ¯1]
```

If we transform the array before [⍖ fall](/docs/fall)ing, we can sort by a key.

Here, we sort the array descending by the [⌵ absolute value](/docs/absolute value) of its elements.

```uiua
⊏⍖⌵. 6_2_7_0_¯1_5
```

```output
[7 6 5 2 ¯1 0]
```
  
[⊢ first](/docs/first)[⍖ fall](/docs/fall) and [⊢ first](/docs/first)[⇌ reverse](/docs/reverse)[⍖ fall](/docs/fall) are optimized in the interpreter to be O(n).

</page>

<page url="https://www.uiua.org/docs/&exit">

# [&exit](/docs/&exit) \- exit

### Monadic 0-output function

Exit the program with a status code

</page>

<page url="https://www.uiua.org/docs/&ims">

# [&ims](/docs/&ims) \- image - show

### Monadic 0-output function

Show an image

How the image is shown depends on the system backend.
  
In the default backend, the image is shown in the terminal.

On the web, the image is shown in the output area.
  
The image must be a rank 2 or 3 numeric array.

Axes 0 and 1 contain the rows and columns of the image.

A rank 2 array is a grayscale image.

A rank 3 array is an RGB image.

In a rank 3 image array, the last axis must be length 1, 2, 3, or 4.

A length 1 last axis is a grayscale image.

A length 2 last axis is a grayscale image with an alpha channel.

A length 3 last axis is an RGB image.

A length 4 last axis is an RGB image with an alpha channel.
  
See also: [&ime](/docs/&ime)

</page>

<page url="https://www.uiua.org/docs/above">

# [◠ above](/docs/above)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Keep all arguments to a function above the outputs on the stack

```uiua
# Experimental!
[◠+ 1 2]
```

```output
[1 2 3]
```

```uiua
# Experimental!
[◠(++) 1 2 3]
```

```output
[1 2 3 6]
```
  
See also: [◡ below](/docs/below)

</page>

<page url="https://www.uiua.org/docs/drop">

# [↘ drop](/docs/drop)

### Dyadic function

Drop the first n elements of an array

This is the opposite of [↙ take](/docs/take).
  
```uiua
↘ 3 [8 3 9 2 0]
```

```output
[2 0]
```

```uiua
↘ 2 ↯3_3⇡9
```

```output
╭─       
╷ 6 7 8  
        ╯
```

Negative amounts drop from the end.

```uiua
↘ ¯3 [8 3 9 2 0]
```

```output
[8 3]
```

```uiua
↘ ¯2 ↯3_3⇡9
```

```output
╭─       
╷ 0 1 2  
        ╯
```

The amount to drop can also be a list to drop along multiple axes.

```uiua
.↯3_4⇡12
↘1_2   .
↘¯2_¯1 :
```

```output
╭─           
╷ 0 1  2  3  
  4 5  6  7  
  8 9 10 11  
            ╯
╭─       
╷  6  7  
  10 11  
        ╯
╭─       
╷ 0 1 2  
        ╯
```
  
Dropping more than the length of the array will leave an empty array.

```uiua
↘ 7 [8 3 9 2 0]
```

```output
[]
```

```uiua
↘ ¯7 [8 3 9 2 0]
```

```output
[]
```

```uiua
↘ 5 ↯3_3⇡9
```

```output
╭─       
╷ 0×3 ℝ  
        ╯
```

```uiua
↘ ¯5 ↯3_3⇡9
```

```output
╭─       
╷ 0×3 ℝ  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/indexof">

# [⊗ indexof](/docs/indexof)

### Dyadic function

Find the first index of each row of one array in another

```uiua
⊗ 2 [1 2 3]
```

```output
1
```

```uiua
⊗ [4 5 6] [1_2_3 4_5_6]
```

```output
1
```

```uiua
⊗ 2 [1_2_3 4_5_6]
```

```output
[1 3]
```

If the index cannot be found, the [⧻ length](/docs/length) of the searched-in array is returned.

```uiua
⊗ [1 2 3] [0 3 4 5 1]
```

```output
[4 5 1]
```

```uiua
⊗ [1_2_3 4_5_6] [3 4 5]
```

```output
╭─       
╷ 3 3 0  
  1 2 3  
        ╯
```

```uiua
⊗ 5 [1 2 3]
```

```output
3
```
  
[⬚ fill](/docs/fill) can be used to set the value of missing items.

```uiua
  ⊗ [4 8 2 9 1] [1 2 3 4]
⬚∞⊗ [4 8 2 9 1] [1 2 3 4]
```

```output
[3 4 1 4 0]
[3 ∞ 1 ∞ 0]
```
  
You can use the returned indices with [⊏ select](/docs/select) to get the rows that were found.

If you expect one of the searched-for rows to be missing, you can use [⬚ fill](/docs/fill) to set a default value.

```uiua
A ← [2 3 5 7 11 13]
.⊗,A [1 2 3 4 5]
⬚∞⊏:A
```

```output
[1 2 3 4 5]
[6 0 1 6 2]
[∞ 2 3 ∞ 5]
```
  
[⊗ indexof](/docs/indexof) is closely related to [∊ member](/docs/member).

</page>

<page url="https://www.uiua.org/tutorial/documentation">

# Documenting Code

Uiua interprets comments in certain contexts as documentation.

For example, writing a comment directly above a binding will make it the documentation for that binding. A binding's documentation will be show when hovering over any references to it, both on this site and when using the language server [in your native editor](/docs/install#editor-support).

Hover over any of the instances of the name `Avg` in the example below to see the documentation.

```uiua
# Get the average of an array
Avg ← ÷⧻⟜/+
Avg [1 2 7 6]
```

```output
4
```

Multiple lines of documentation can be written by using multiple comments.

```uiua
# Remove the first instance of one array from another
# The first array must be one rank lower than the second
RemFirst ← ⍜↻(↘1)⊗⊙.
RemFirst 1_2 [3_5 1_2 0_2 1_2]
```

```output
╭─     
╷ 3 5  
  0 2  
  1 2  
      ╯
```

If both your binding code and your documentation are short, you can write them on the same line.

```uiua
Avg ← ÷⧻⟜/+ # Average of an array
Avg [1_2 3_4 5_9]
```

```output
[3 5]
```

If you start a line in a comment with `?`, subsequent words will be interpreted as argument names.

These are handled separately from the rest of the comment, and they will be checked against a function's signature.

```uiua
# Remove the first instance of one array from another
# ? Needle Haystack
RemFirst ← ⍜↻(↘1)⊗⊙.
```

These names should follow the same conventions as binding names.

```uiua
# Do the thing
# ? x y
Foo ← ≡↻⇡⧻⟜¤
```

```output
Warning: Foo's comment describes 2 args, but its code has signature |1
  at 3:1
3 | Foo ← ≡↻⇡⧻⟜¤
    ───
```

The `?` is similar to the [? stack](/docs/stack) function because the arguments indicate the intended state of the stack before the function is called.

If you also want to give names to a function's outputs, you can list them in front of the `?`. This lets you read the comment signature right-to-left, the same way as normal Uiua code.

```uiua
# Quotient Remainder ? Divisor Dividend
DivRem ← ⌊⊃÷◿
DivRem 3 7
```

```output
1
2
```

</page>

<page url="https://www.uiua.org/docs/map">

# [map](/docs/map)

### Dyadic function

Create a hashmap from a list of keys and list values

A hashmap is a normal array that is used as a mapping from keys to values.

The related map functions [insert](/docs/insert), [has](/docs/has), and [get](/docs/get), all treat the array as an actual hashmap, so they have O(1) amortized time complexity.

Because the values array maintains insertion order, the [remove](/docs/remove) function has O(n) time complexity.
  
```uiua
map 1_2 3_4
map {"Alice" "Bob" "Carol"} [3_8 12_2 4_5]
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
╭─                  
╷ ⌜Alice⌟ → [3 8]   
  ⌜Bob⌟   → [12 2]  
  ⌜Carol⌟ → [4 5]   
                   ╯
```

Use [get](/docs/get) to get the value corresponding to a key.

```uiua
map 1_2 3_4
get 2 .
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
4
```

Use [insert](/docs/insert) to insert additional key-value pairs.

```uiua
map 1_2 3_4
insert 5 6
```

```output
╭─       
  1 → 3  
  2 → 4  
  5 → 6  
        ╯
```

An empty array can be used as an empty map, event if it was not created with [map](/docs/map).

```uiua
has 5 []
insert 1 2 []
```

```output
0
[1 → 2]
```

You can use [° un](/docs/un)[map](/docs/map) to get the keys list and values list back.

```uiua
[]
insert 1 2_3
insert 4 5_6
insert 7 8_9
°map .
```

```output
╭─           
╷ 1 → [2 3]  
  4 → [5 6]  
  7 → [8 9]  
            ╯
╭─     
╷ 2 3  
  5 6  
  8 9  
      ╯
[1 4 7]
```
  
Pervasive operations work on the values of a map, but not on the keys.

```uiua
×10 map 1_2_3 4_5_6
```

```output
╭─        
  1 → 40  
  2 → 50  
  3 → 60  
         ╯
```

Some normal array operations work on maps:

\- [⇌ reverse](/docs/reverse)

\- [↻ rotate](/docs/rotate)

\- [↙ take](/docs/take)

\- [↘ drop](/docs/drop)

\- [⊂ join](/docs/join)

\- [∵ each](/docs/each)

\- [≡ rows](/docs/rows)

\- [⊛ classify](/docs/classify)

\- [◴ deduplicate](/docs/deduplicate)

Operations that do not specifically work on maps will remove the keys and turn the map into a normal array.
  
[¤ fix](/docs/fix)ing a map will [¤ fix](/docs/fix) the keys and values. This exposes the true structure of the keys array.

```uiua
¤ map 3_10_5 "abc"
```

```output
╭─                    
╷ [⋅ 5 3 10] → "abc"  
                     ╯
```

This is usually only useful with [≡ rows](/docs/rows).

```uiua
≡get [1 3 3 2] ¤ map 1_2_3 4_5_6
```

```output
[4 6 6 5]
```
  
Map keys are stored as metadata on the values array. For this reason, they cannot be put in arrays together without being [□ box](/docs/box)ed, as the metadata for each map would be lost.
  
Regardless of the size of the map, operations on it have O(1) amortized time complexity.

In this example, we time [get](/docs/get) and [insert](/docs/insert) operations on maps from 10 entries up to 100,000 entries.

```uiua
Times ← (
  map.⇡
  [⊙◌⍜now(get 5):
   ⊙◌⍜now(insert 1 2).]
)
ⁿ:10+1⇡5
≡Times.
```

```output
[10 100 1000 10000 100000]
╭─                                             
╷ 0.00009989738464355469                    0  
                       0                    0  
                       0                    0  
                       0                    0  
                       0 0.001399993896484375  
                                              ╯
```

</page>

<page url="https://www.uiua.org/tutorial/types">

# Types

Every value in Uiua is an array. However, different arrays on the stack can have different _types_ of items. Every element of an array is always the same type. Unlike some other array programming languages, Uiua arrays cannot have elements of different types.

There are four types of arrays:

* **Number**
* **Complex**
* **Character**
* **Box**

## [Numbers](#numbers)

Numbers are decimal numbers with floating precision. They use the IEEE-754 double-precision floating-point format.

```uiua
[5 6e3 0 3.2 3/4 ¯1.1 π ∞]
```

```output
[5 6000 0 3.2 0.75 ¯1.1 π ∞]
```

Most math operations can only be applied to numbers.

In cases where a number with a fractional part has repeating decimals, or when floating-point errors create tiny differences, the number will be shown with repeated decimal digits replaced by a `…`.

```uiua
1/3
1/12
1/24
+ 0.1 0.2
```

```output
0.333…
0.08333…
0.04166…64
0.300…04
```

Even though numbers can have a fractional part, many built-in functions require whole numbers. These functions will return an error if given a non-whole number.

One such example is [⊡ pick](/docs/pick).

```uiua
⊡ 2 [4 7 9 1 0]
```

```output
9
```

```uiua
⊡ 3.1 [4 7 9 1 0]
```

```output
Error: Index must be an array of integers, but 3.1 is not an integer
  at 1:1
1 | ⊡ 3.1 [4 7 9 1 0]
    ─
```

If you want to convert a number to a whole number, you can use [⌊ floor](/docs/floor), [⌈ ceiling](/docs/ceiling), or [⁅ round](/docs/round).

## [Complex Numbers](#complex-numbers)

Complex numbers can be created with the [ℂ complex](/docs/complex) function.

```uiua
ℂ 3 5
```

```output
5+3i
```

```uiua
ℂ [1 2 3] [4 5 6]
```

```output
[4+i 5+2i 6+3i]
```

While complex numbers support all the same math operations as normal numbers, they are a distinct type and cannot be used in place of normal numbers.

You can convert a complex number to a normal number with [⌵ absolute value](/docs/absolute value).

```uiua
⌵ ℂ3 4
```

```output
5
```

You can normalize a complex number to a unit vector with [± sign](/docs/sign).

```uiua
± ℂ3 4
```

```output
0.8+0.6i
```

[√ sqrt](/docs/sqrt) only returns a complex number if it is called on a complex number. Beware of floating-point errors.

```uiua
√  ¯4
√ℂ0¯4
```

```output
NaN
2i
```

See [ℂ complex](/docs/complex)'s docs for more details.

Comparing complex numbers for equality returns a normal number.

```uiua
= i ℂ0 1
= i ℂ1 1
```

```output
0
0
```

Comparing complex numbers for order returns a component-wise comparison.

```uiua
< i ℂ¯1 1
≥ i ℂ1 1
```

```output
i
1+i
```

## [Characters](#characters)

Characters are represented as 32-bit Unicode codepoints.

Character literals, denoted with a preceding `@`, create rank 0 (scalar) character arrays.

```uiua
@a @b
```

```output
@b
@a
```

```uiua
[@u @i @u @a]
```

```output
Advice: An array of characters should instead be written as a string
  at 1:1
1 | [@u @i @u @a]
    ─────────────

"uiua"

```

Characters like newline or null need to be escaped with `\`, but spaces do not.

```uiua
@\r @\0 @ 
```

```output
@ 
@\0
@\r
```

If you don't like the significant whitespace of `@ `, `@\s` is also space.

As noted in the advice diagnostic above, string literals, delimited by `"`s, create rank-1 character arrays.

```uiua
△."Hello, World!"
```

```output
"Hello, World!"
[13]
```

You can make raw strings, which do not require escaping, with a `$` followed by a space.

[&p](/docs/&p) pretty-prints a value.

```uiua
&p $ "How are you?" she asked.
```

```output
"How are you?" she asked.

```

Raw strings that follow each other form multi-line strings.

```uiua
$ Hello
$ World!
```

```output
"Hello\nWorld!"
```

This style of string is useful when your string contains a lot of quotes that you don't want to escape.

```uiua
$ And then she was like, "No way!"
$ And I was like, "Way..."
```

```output
"And then she was like, "No way!"\nAnd I was like, "Way...""
```

Characters in character or string literals can also be specified with 2 or 4 hex digits by using escape codes `\x` and `\u` respectively.

```uiua
"\x41\x42\x43"
```

```output
"ABC"
```

```uiua
@\u2665
```

```output
@♥
```

Longer (or shorter) sequences can be specified between `{}`s after a `\u`.

```uiua
@\u{1f600}
```

```output
@😀
```

Note that these escape sequences do not work in raw strings.
  
## [Character Arithmetic](#character-arithmetic)

Characters and numbers exist in an [affine space](https://en.wikipedia.org/wiki/Affine%5Fspace), the same as in [BQN](https://mlochbaum.github.io/BQN/doc/arithmetic.html#character-arithmetic).

You can [+ add](/docs/add) numbers and characters to get another character.

You can [\- subtract](/docs/subtract) a number from a character to get another character.

You can [\- subtract](/docs/subtract) two characters to get a number.

You can [× multiply](/docs/multiply) or [÷ divide](/docs/divide) a character by a number to possibly toggle its case.

_No_ other binary arithmetic operations can be done on characters.

```uiua
+1 @a
```

```output
@b
```

```uiua
-8 "Uiua"
```

```output
"MamY"
```

```uiua
-@a @z
```

```output
25
```

```uiua
× [1 ¯5 0 ¯2] "uiua"
```

```output
"uIuA"
```

```uiua
+@a @b
```

```output
Error: Cannot add character and character
  at 1:1
1 | +@a @b
    ─
```

[± sign](/docs/sign) gives the case of a character. It gives `1` for uppercase, `¯1` for lowercase, and `0` for caseless characters.

```uiua
± "Hello, World!"
```

```output
[1 ¯1 ¯1 ¯1 ¯1 0 0 1 ¯1 ¯1 ¯1 ¯1 0]
```

[⌵ absolute value](/docs/absolute value) uppercases a character.

```uiua
⌵ "Hello, World!"
```

```output
"HELLO, WORLD!"
```

[¯ negate](/docs/negate) toggles the case of a character.

```uiua
¯ "Hello, World!"
```

```output
"hELLO, wORLD!"
```

Use [¯ negate](/docs/negate) and [⌵ absolute value](/docs/absolute value) together to lowercase a character.

```uiua
¯⌵ "Hello, World!"
```

```output
"hello, world!"
```

## [Boxes](#boxes)

Boxes are containers that can wrap an array of any type or shape. Multiple boxes can be put in the same array, no matter their contents.

Boxes can be created either by using the [□ box](/docs/box) function or with boxing array notation between `{}`s.

```uiua
□5
```

```output
□5
```

```uiua
□[1 2 3]
```

```output
⟦1 2 3⟧
```

```uiua
□"Hello!"
```

```output
⌜Hello!⌟
```

```uiua
{"cat" 5}
```

```output
{"cat" 5}
```

## [Type agreement](#type-agreement)

For functions that work on the structure of arrays rather than their values, the types of the arrays must match.

```uiua
⊂ 1_2 3
```

```output
[1 2 3]
```

```uiua
⊟ "Hello" "World"
```

```output
╭─         
╷ "Hello"  
  "World"  
          ╯
```

```uiua
⊟ 1_2_3 "dog"
```

```output
Error: Cannot couple number array with character array
  at 1:1
1 | ⊟ 1_2_3 "dog"
    ─
```

There is an exception for boxes. Any box can be put in an array with a non-box. In this case, the non-box will be [□ box](/docs/box)ed first.

```uiua
⊟ 5 □[1 2 3]
```

```output
{5 [1 2 3]}
```

## [Empty Arrays](#empty-arrays)

The type of an array that is constructed with no elements depends on the syntax used to construct it. Its shape is always `[0]`.

We can use the [type](/docs/type) function to get the type of an array. `0` corresponds to real numbers, `1` to complex numbers, `2` to characters, and `3` to boxes.

```uiua
type []
```

```output
0
```

```uiua
type ""
```

```output
2
```

```uiua
type {}
```

```output
3
```

</page>

<page url="https://www.uiua.org/docs/under">

# [⍜ under](/docs/under)

### Dyadic modifier

Operate on a transformed array, then reverse the transformation

This is a more powerful version of [° un](/docs/un).

Conceptually, [⍜ under](/docs/under) transforms a value, modifies it, then reverses the transformation.
  
A list of all [⍜ under](/docs/under)\-compatible functions can be found [below](#unders).
  
[⍜ under](/docs/under) takes 2 functions `f` and `g` and some other arguments `xs`.

It applies `f` to `xs`, then applies `g` to the result.

It then applies the inverse of `f` to the result of `g`.
  
Any function that can be [° un](/docs/un)ed can be used with [⍜ under](/docs/under).

Some functions that can't be [° un](/docs/un)ed can still be used with [⍜ under](/docs/under).
  
Here, we [¯ negate](/docs/negate) 5, [\- subtract](/docs/subtract) 2, then [¯ negate](/docs/negate) again.

```uiua
⍜¯(-2) 5
```

```output
7
```

You can use [⍜ under](/docs/under)[× multiply](/docs/multiply)[⁅ round](/docs/round) to round to a specific number of decimal places.

```uiua
⍜×⁅ 1e3 π
```

```output
3.142
```
  
In general, if two functions are compatible with [⍜ under](/docs/under) separately, then they are compatible together.

```uiua
⍜(↙⊙↘|×10) 2 1 [1 2 3 4 5]
```

```output
[1 20 30 4 5]
```
  
[⍜ under](/docs/under)[∩ both](/docs/both) works, and whether [∩ both](/docs/both) is applied when undoing depends on the signature of `g`.

For example, this hypotenuse function does not use [∩ both](/docs/both) when undoing because its `g` ([+](/docs/add)) returns a single value.

```uiua
⍜∩(×.)+ 3 4
```

```output
5
```

However, this function whose `g` returns _2_ values _does_ use [∩ both](/docs/both) when undoing, in this case re-[□ box](/docs/box)ing the outputs.

```uiua
⍜∩°□(⊂⊢,) □[1 2 3] □[4 5 6 7 8]
```

```output
⟦4 5 6 7 8⟧
⟦4 1 2 3⟧
```
  
[setund](/docs/setund) can be used to define a function's [⍜ under](/docs/under) behavior.
  
For more about [⍜ under](/docs/under) and inverses, see the [Inverse Tutorial](/tutorial/inverses).

## [](#unders)[⍜ under](/docs/under)\-compatible functions

Any function that is compatible with [° un](/docs/un) is also compatible with [⍜ under](/docs/under).

Functions that are compatible with [⍜ under](/docs/under) that are either not compatible with [° un](/docs/un) or have different behavior are listed below.

See the [similar table](/docs/un#uns) for [° un](/docs/un) for more.

| Pattern                                  | Value? \* | Notes                                                                                                                             | Example                                                                      |
| ---------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [° un](/docs/un)                         | Optional  | Inner function must be invertible                                                                                                 | ⍜°⊟: \[1 2\]\[2 1\]                                                          |
| [+ add](/docs/add)                       | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜+(×2) 1 511                                                                 |
| [\- subtract](/docs/subtract)            | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜-(×2) 1 59                                                                  |
| [× multiply](/docs/multiply)             | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜×(+1) 2 55.5                                                                |
| [÷ divide](/docs/divide)                 | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜÷(+1) 2 57                                                                  |
| [◿ modulus](/docs/modulus)               | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜◿(×10) 4 918                                                                |
| [ⁿ power](/docs/power)                   | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜ⁿ(-9) 2 54                                                                  |
| [ₙ logarithm](/docs/logarithm)           | Optional  | Optional [: flip](/docs/flip)                                                                                                     | ⍜ₙ(+1) 3 824                                                                 |
| [⌊ floor](/docs/floor)                   | No        | ⍜⌊(×10) 1.510.5                                                                                                                   |                                                                              |
| [⌈ ceiling](/docs/ceiling)               | No        | ⍜⌈(×10) 1.519.5                                                                                                                   |                                                                              |
| [⁅ round](/docs/round)                   | No        | ⍜⁅(×10) 1.519.5                                                                                                                   |                                                                              |
| [⌵ absolute value](/docs/absolute value) | No        | ⍜⌵(+1) ¯5¯6                                                                                                                       |                                                                              |
| [± sign](/docs/sign)                     | No        | ⍜±(×2) ¯5¯10                                                                                                                      |                                                                              |
| [⊢ first](/docs/first)                   | No        | ⍜⊢(×10) \[1 2 3 4 5\]\[10 2 3 4 5\]                                                                                               |                                                                              |
| [⊢](/docs/first)[⇌](/docs/reverse)       | No        | ⍜(⊢⇌\|×10) \[1 2 3 4 5\]\[1 2 3 4 50\]                                                                                            |                                                                              |
| [♭ deshape](/docs/deshape)               | No        | ⍜♭⇌ ↯3\_3⇡9╭─        ╷ 8 7 6     5 4 3     2 1 0           ╯                                                                      |                                                                              |
| [⍏ rise](/docs/rise)                     | No        | ⍜⍏(↻¯1). \[1 4 2 3 5\]\[1 4 2 3 5\] \[5 3 1 2 4\]                                                                                 |                                                                              |
| [⍖ fall](/docs/fall)                     | No        | ⍜⍖(↻¯1). \[1 4 2 3 5\]\[1 4 2 3 5\] \[2 5 3 4 1\]                                                                                 |                                                                              |
| [⊚ where](/docs/where)                   | No        | Maintains minumum shape                                                                                                           | ⍜⊚⊂ \[1 0 0 0 0\] 3\[1 0 0 1 0\]                                             |
| [⊛ classify](/docs/classify)             | No        | ⍜⊛⇌ "hello""olleh"                                                                                                                |                                                                              |
| [◴ deduplicate](/docs/deduplicate)       | No        | ⍜◴⇌ "hello""oleeh"                                                                                                                |                                                                              |
| [☇ rerank](/docs/rerank)                 | Optional  | ⍜(☇1)⇌ ↯2\_2\_4⇡16╭─              ╷ 12 13 14 15   ╷  8  9 10 11                      4  5  6  7      0  1  2  3                 ╯ |                                                                              |
| [↯ reshape](/docs/reshape)               | Optional  | ⍜↯⇌ 2\_3 ⇡6\[3 4 5 0 1 2\]                                                                                                        |                                                                              |
| [↙ take](/docs/take)                     | Optional  | ⍜↙(×10) 2 \[1 2 3 4 5\]\[10 20 3 4 5\]                                                                                            |                                                                              |
| [↘ drop](/docs/drop)                     | Optional  | ⍜↘(×10) 2 \[1 2 3 4 5\]\[1 2 30 40 50\]                                                                                           |                                                                              |
| [▽ keep](/docs/keep)                     | Optional  | ⍜▽(×10) ◿2\. \[1 2 3 4 5\]\[10 2 30 4 50\]                                                                                        |                                                                              |
| [↻ rotate](/docs/rotate)                 | Optional  | ⍜(↻2\|⊂π) \[1 2 3 4 5\]\[1 2 π 3 4 5\]                                                                                            |                                                                              |
| [⊏ select](/docs/select)                 | Optional  | Duplicate indices must have the same value                                                                                        | ⍜(⊏1\_4\|×10) \[1 2 3 4 5\]\[1 20 3 4 50\]                                   |
| [⊡ pick](/docs/pick)                     | Optional  | Duplicate indices must have the same value                                                                                        | ⍜(⊡1\_1\|×10) \[1\_2\_3 4\_5\_6\]╭─         ╷ 1  2 3     4 50 6            ╯ |
| [⊂ join](/docs/join)                     | No        | [⧻ length](/docs/length) may not change                                                                                           | ⍜⊂\\+ 1\_2\_3 4\_5\_6\[10 15 21\] \[1 3 6\]                                  |
| [⊙ dip](/docs/dip)                       | No        | Inner function must be invertible                                                                                                 | ⍜⊙⊂× 10 2 330 20                                                             |
| [∩ both](/docs/both)                     | No        | Inner function must be invertible                                                                                                 | ⍜∩⊡: 1 \[1 2 3\] 2 \[4 5 6\]\[4 5 2\] \[1 6 3\]                              |
| [◌ pop](/docs/pop)                       | No        | ⍜◌(×2) 1 2Style: Prefer ⊙ dip over \`⍜◌\` for clarity   at 1:1 1 \| ⍜◌(×2) 1 2     ── 4 1                                         |                                                                              |
| [≡ rows](/docs/rows)                     | No        | Inner function must be invertible                                                                                                 | ⍜≡⊢(×10) \[1\_2\_3 4\_5\_6\]╭─         ╷ 10 2 3     40 5 6            ╯      |
| [∵ each](/docs/each)                     | No        | Inner function must be invertible                                                                                                 | ⍜∵⇌⍚\\+ {1\_2\_3 4\_5}{\[6 5 3\] \[9 5\]}                                    |
| [⊕ group](/docs/group)                   | No        | Inner function must be invertible                                                                                                 | ⍜⊕□≡⇌ ≠@ . "I love arrays""s yarr aevolI"                                    |
| [⊜ partition](/docs/partition)           | No        | Inner function must be invertible                                                                                                 | ⍜⊜□≡⇌ ≠@ . "Hello World""olleH dlroW"                                        |
| [∧ fold](/docs/fold)                     | No        | Inner function must be invertible                                                                                                 | ⍜∧⊏(×10) \[0 2\] ↯2\_3⇡6╭─         ╷ 0 1 20     3 4  5            ╯          |
| [⍥ repeat](/docs/repeat)                 | Optional  | Inner function must be invertible                                                                                                 | ⍜⍥(×2). 5 132 1                                                              |
| [⨬ switch](/docs/switch)                 | No        | ⍜(⨬⊢(⊢⇌)\|×10) 1 \[1 2 3 4\]\[1 2 3 40\]                                                                                          |                                                                              |
| [now](/docs/now)                         | No        | Times execution                                                                                                                   | ⍜now(&sl 0.005)                                                              |
| [&fo](/docs/&fo)                         | Optional  | Calls [&cl](/docs/&cl) on handle                                                                                                  |                                                                              |
| [&fc](/docs/&fc)                         | Optional  | Calls [&cl](/docs/&cl) on handle                                                                                                  |                                                                              |
| [&runs](/docs/&runs)                     | Optional  | Calls [&cl](/docs/&cl) on handle                                                                                                  |                                                                              |
| [&tcpc](/docs/&tcpc)                     | Optional  | Calls [&cl](/docs/&cl) on handle                                                                                                  |                                                                              |
| [&tcpa](/docs/&tcpa)                     | Optional  | Calls [&cl](/docs/&cl) on handle                                                                                                  |                                                                              |
| [&fras](/docs/&fras)                     | Optional  | Calls [&fwa](/docs/&fwa)                                                                                                          |                                                                              |
| [&frab](/docs/&frab)                     | Optional  | Calls [&fwa](/docs/&fwa)                                                                                                          |                                                                              |

</page>

<page url="https://www.uiua.org/docs">

# Documentation

## [Language Tour](#language-tour)

If you want to jump right in, check out the [Language Tour](/docs/tour) for a high-level overview!

Otherwise, read on for more detailed documentation.

## [Tutorial](#tutorial)

### **_If you are new to Uiua, you will likely be lost if you don't read this!_**

These pages introduce Uiua concepts one at a time, each tutorial building on the previous. They go into much more depth than the language tour.

They are meant to be read in order, but feel free to skip around!

* [Introduction](/tutorial/introduction)
* [Basic Stack Operations and Formatting](/tutorial/basic)
* [Math and Comparison](/tutorial/math)
* [Arrays](/tutorial/arrays)
* [Types](/tutorial/types)
* [Bindings](/tutorial/bindings)
* [Modifiers and Functions](/tutorial/functions)
* [Advanced Stack Manipulation](/tutorial/advancedstack)
* [Inverses](/tutorial/inverses)
* [Control Flow](/tutorial/controlflow)
* [Pattern Matching](/tutorial/patternmatching)
* [Advanced Array Manipulation](/tutorial/advancedarray)
* [Thinking With Arrays](/tutorial/thinkingwitharrays)
* [Macros](/tutorial/macros)
* [Modules](/tutorial/modules)
* [Testing](/tutorial/testing)

## [Other Tutorials](#other-tutorials)

These tutorials cover more specific topics. They assume you have read the main tutorial above, but they can be read in any order.

* [Documenting Code](/tutorial/documentation) \- how to document Uiua code
* [Strings](/tutorial/strings) \- how to manipulate strings
* [Files and Streams](/tutorial/filesandstreams) \- how to read and write files and streams
* [Audio](/tutorial/audio) \- how to generate and play audio
* [Images and GIFs](/tutorial/images) \- how to generate images and GIFs

## [Other Docs](#other-docs)

* [Installation](/docs/install) \- how to install and use Uiua's interpreter
* [Changelog](/docs/changelog) \- what's new in each version
* [Constants](/docs/constants) \- a list of the shadowable constants
* [Formatter Configuration](/docs/format-config) \- how to configure the Uiua formatter
* [Optimizations](/docs/optimizations) \- a list of optimizations in the interpreter
* [Experimental Features](/docs/experimental) \- an overview of experimental features
* [Stack Idioms](/docs/stack-idioms) \- common ways of manipulating the stack

## [Other Pages](#other-pages)

* [Design](/docs/design) \- reasons for some of Uiua's design decisions
* [Right-to-Left](/docs/rtl) \- the answer to the most-asked question about Uiua's design gets its own page
* [Technical Details](/docs/technical) \- notes on the implementation of the Uiua interpreter and this website
* [Combinators](/docs/combinators) \- a list of common combinators implemented in Uiua
* [Uiuisms](https://tankorsmash.unison-services.cloud/s/uiuisms-service/)\- a community catalog of many common Uiua snippets
* [Primitives JSON](/primitives.json) \- a JSON file of all the primitives, for tooling and other projects

</page>

<page url="https://www.uiua.org/docs/trace">

# [⸮ trace](/docs/trace)

### Monadic function

Debug print the top value on the stack without popping it

```uiua
⸮[1 2 3]
```

```output
┌╴1:1
├╴[1 2 3]
└╴╴╴╴

[1 2 3]
```

This is useful when you want to inspect an intermediate value.

For example, let's say you are trying to find all the numbers in some range:

```uiua
[1 5 2 9 11 0 7 12 8 3]
▽×≥5:≤10..
```

```output
[5 9 7 8]
```

[≥](/docs/greater or equal) and [≤](/docs/less or equal) each create a partial mask.

To see them, use [⸮ trace](/docs/trace).

```uiua
[1 5 2 9 11 0 7 12 8 3]
▽×⸮≥5:⸮≤10..
```

```output
┌╴2:7
├╴[1 1 1 1 0 1 1 0 1 1]
└╴╴╴╴
┌╴2:3
├╴[0 1 0 1 1 0 1 1 1 0]
└╴╴╴╴

[5 9 7 8]
```

</page>

<page url="https://www.uiua.org/docs/where">

# [⊚ where](/docs/where)

### Monadic function

Get indices where array values are not equal to zero

The most basic use is to convert a mask into a list of indices.

```uiua
⊚ [1 0 0 1 0 1 1 0]
```

```output
[0 3 5 6]
```

```uiua
⊚.=0◿3.[1 0 2 9 3 8 3 4 6]
```

```output
[1 0 2 9 3 8 3 4 6]
[0 1 0 1 1 0 1 0 1]
[1 3 4 6 8]
```

It also works for counts [\>](/docs/greater than) 1.

```uiua
⊚ 1_2_3
```

```output
[0 1 1 2 2 2]
```

```uiua
⊚ 1_4_2
```

```output
[0 1 1 1 1 2 2]
```

[⊚ where](/docs/where) on a list is equivalent to [▽](/docs/keep)[:](/docs/flip)[⇡](/docs/range)[⧻](/docs/length)[.](/docs/duplicate)

```uiua
    ⊚ [0 1 0 0 2 0 1]
```

```output
[1 4 4 6]
```

```uiua
▽:⇡⧻. [0 1 0 0 2 0 1]
```

```output
[1 4 4 6]
```
  
[° un](/docs/un)[⊚ where](/docs/where) will convert the indices back into a a list of counts

```uiua
°⊚ [0 0 0 1 1 2 2 2 2 2 3]
```

```output
[3 2 5 1]
```

The indices need not be in order

```uiua
°⊚ [0 1 2 2 0 3 2 1 2 0 2]
```

```output
[3 2 5 1]
```
  
[⊚ where](/docs/where) can be used on multidimensional arrays, and the result will always be rank-2

```uiua
⊚.[1_0_0 0_1_1 0_2_0]
```

```output
╭─       
╷ 1 0 0  
  0 1 1  
  0 2 0  
        ╯
╭─     
╷ 0 0  
  1 1  
  1 2  
  2 1  
  2 1  
      ╯
```

The inverse works as well

```uiua
°⊚[3_4 2_1 0_3]
```

```output
╭─           
╷ 0 0 0 1 0  
  0 0 0 0 0  
  0 1 0 0 0  
  0 0 0 0 1  
            ╯
```
  
[⊚ where](/docs/where) on a scalar is equivalent to [⊚ where](/docs/where) on a singleton array of that scalar, and so creates a list of `0`s.

```uiua
⊚3
```

```output
[0 0 0]
```

```uiua
⊚8
```

```output
[0 0 0 0 0 0 0 0]
```

</page>

<page url="https://www.uiua.org/docs/each">

# [∵ each](/docs/each)

### Monadic modifier

Apply a function to each element of an array or arrays

This is the element-wise version of [≡ rows](/docs/rows).

**This is often not what you want.** Prefer using pervasive functions or [⊞ table](/docs/table) when possible.
  
The number of arrays used depends on how many arguments the function takes.

```uiua
∵(⊟.) 1_2_3_4
```

```output
╭─     
╷ 1 1  
  2 2  
  3 3  
  4 4  
      ╯
```

```uiua
∵⊂ 1_2_3 4_5_6
```

```output
╭─     
╷ 1 4  
  2 5  
  3 6  
      ╯
```

```uiua
∵⊂ 1_2 [4_5 6_7]
```

```output
╭─     
╷ 1 4  
╷ 1 5  
       
  2 6  
  2 7  
      ╯
```
  
If the function is already pervasive, then [∵ each](/docs/each) is redundant.

```uiua
∵+ 1_2_3 4_5_6
```

```output
Advice: + add is pervasive, so ∵ each is redundant here.
  at 1:1
1 | ∵+ 1_2_3 4_5_6
    ─

[5 7 9]

```

```uiua
 + 1_2_3 4_5_6
```

```output
[5 7 9]
```
  
[∵ each](/docs/each) is one of a few modifiers that uses [proxy values](/tutorial/functions#proxy).

</page>

<page url="https://www.uiua.org/docs/&var">

# [&var](/docs/&var) \- environment variable

### Monadic function

Get the value of an environment variable

Expects a string and returns a string.

If the environment variable does not exist, an error is thrown.

</page>

<page url="https://www.uiua.org/docs/spawn">

# [spawn](/docs/spawn)

### Monadic modifier

Spawn a thread

Expects a function.

In the native interpreter, the function is called in a new OS thread.

In the web editor, the function is called and blocks until it returns.

A thread id that can be passed to [wait](/docs/wait) is pushed to the stack. Handles are just numbers.

[wait](/docs/wait) consumes the thread id and appends the thread's stack to the current stack.

```uiua
     spawn⇡ 10
wait spawn⇡ 10
```

```output
1
[0 1 2 3 4 5 6 7 8 9]
```

```uiua
     spawn(+10+) 1 2
wait spawn(+10+) 1 2
```

```output
1
13
```
  
You can use [≡ rows](/docs/rows) to spawn a thread for each row of an array.

```uiua
≡spawn(/+⇡×.) ⇡10
```

```output
[1 2 3 4 5 6 7 8 9 10]
```
  
[wait](/docs/wait) will call [∵ each](/docs/each) implicitly.

```uiua
↯3_3⇡9
wait≡spawn/+.
```

```output
╭─       
╷ 0 1 2  
  3 4 5  
  6 7 8  
        ╯
[3 12 21]
```
  
For spawn threads in a thread pool, use [pool](/docs/pool).

</page>

<page url="https://www.uiua.org/docs/but">

# [⤙ but](/docs/but)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Call a function but keep its last argument on the top of the stack

```uiua
# Experimental!
[⤙+ 2 5]
[⤙- 2 5]
```

```output
[5 7]
[5 3]
```

[⤙ but](/docs/but) can be used to copy a value from deep in the stack, or to move it.

```uiua
# Experimental!
[⤙⊙⊙⊙∘ 1 2 3 4]
[⤙⊙⊙⊙◌ 1 2 3 4]
```

```output
[4 1 2 3 4]
[4 1 2 3]
```

[⤙ but](/docs/but) always takes at least 2 arguments, even if its function takes fewer.

```uiua
# Experimental!
[⤙¯ 2]
```

```output
Error: Stack was empty evaluating argument 2
  at 2:2
2 | [⤙¯ 2]
     ─
```

```uiua
# Experimental!
[⤙¯ 2 5]
```

```output
[5 ¯2 5]
```

</page>

<page url="https://www.uiua.org/docs/&memfree">

# [&memfree](/docs/&memfree) \- free memory

### Monadic 0-output function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Free a pointer

_Warning ⚠️: \[&memfree\] can lead to undefined behavior if used incorrectly._
  
This is useful for freeing memory allocated by a foreign function.

Expects a pointer.

See [&memcpy](/docs/&memcpy) for an example.

</page>

<page url="https://www.uiua.org/docs/install">

## [Installing Uiua](#installing-uiua)

If your OS is supported, then the newest version of the Uiua interpreter can be downloaded from the [releases](https://github.com/uiua-lang/uiua/releases) page.

Otherwise, the native Uiua interpreter can be installed via Cargo.

This requires a [Rust](https://www.rust-lang.org/tools/install) installation (>=1.75).

Once you have that, run the following command:

```
cargo install uiua
```

On Linux, this may require installing some dependencies:

```
apt install libx11-dev
```

The following optional features are available but not enabled by default (enabled by passing `--features <feature>`):

* `audio` \- Enables audio system functions.  
On Linux, this may require installing some dependencies:  
```  
apt install libasound2-dev libudev-dev pkg-config  
```
* `webcam` \- Enables webcam system functions.  
On Linux, this may require installing some dependencies:  
```  
apt install libjpeg-dev  
```

If you want the most recent development version of Uiua, you can install from the git repository.

```
cargo install --git https://github.com/uiua-lang/uiua uiua
```

## [Fonts](#fonts)

Uiua supports a few custom fonts, but [Uiua386](https://github.com/uiua-lang/uiua/raw/main/site/Uiua386.ttf) is the primary one.

* [Uiua386](https://github.com/uiua-lang/uiua/raw/main/site/Uiua386.ttf) \- inspired by APL386\. Thanks to Gifti for making it!
* Jonathan Perret's [Uiua386Color](https://github.com/jonathanperret/uiua386color) \- a colored version of Uiua386
* [DejaVuSansMono](https://github.com/uiua-lang/uiua/raw/main/site/DejaVuSansMono.ttf) \- a modified version

Uiua was originally designed to be used with stock [DejaVu Sans Mono](https://dejavu-fonts.github.io), but further development and glyph choices target Uiua386.

## [Editor Support](#editor-support)

An official [Uiua language extension for VSCode](https://marketplace.visualstudio.com/items?itemName=uiua-lang.uiua-vscode) is available.

For Neovim, Apeiros-46B maintains [syntax](https://github.com/Apeiros-46B/nvim/blob/main/after/syntax/uiua.vim) and [LSP](https://github.com/Apeiros-46B/nvim/blob/main/after/ftplugin/uiua.lua) scripts.

For Vim, sputnick1124 maintains a [Uiua plugin](https://github.com/sputnick1124/uiua.vim).

For Emacs, crmsnbleyd maintains a [Uiua mode](https://github.com/crmsnbleyd/uiua-ts-mode).

These require Uiua to be installed and in your `PATH`.

## [Basic Usage](#basic-usage)

Running just `uiua` will display the help message if there are no `.ua` files in the directory.

You can initialize a `main.ua` with `uiua init`.

Once a `.ua` file exists, running `uiua` will begin watching the directory for changes. If you edit and save a `.ua` file, the interpreter will automatically format and run it.

You should configure you editor so that it automatically reloads files if they change on disk. This will allow you to see the formatted file as soon as it is saved.

Use `uiua <PATH>` or `uiua run [PATH]` to format and run a file without watching it.

Use `uiua fmt [PATH]` to format a file without running it.

Use `uiua test [PATH]` to run tests.

</page>

<page url="https://www.uiua.org/blog/what-will-1-look-like">

# What will Uiua 1.0 look like? 

2024-01-19 

---

The [Uiua pad](https://uiua.org/pad) page prominently displays the words "Uiua is not yet stable". And so it has been asked: when will Uiua be stable? What features will it have? Is there a roadmap? 

This post is to organize and present my thoughts on the future of Uiua. 

## [Stability ](#stability)

Uiua will be made officially stable only after it has been unofficially stable for some time. That is, not until no breaking changes have been made for a long time. 

The following language features will need to be nailed down before Uiua can ever be stable. 

### Stack manipulation 

I think working with the stack, at least for up to 3 values, has become mostly pretty nice. However, things start to get complicated when working with more values, as is often necessary. There is some design work to be done here, and it's not out of the question that a very small amount of non-tacitness could be introduced to improve this. 

The experimental [bind](https://uiua.org/docs/experimental#swizzles) modifier is a potential solution to this problem. 

There is a balance to be struc between Uiua's goal of tacitness and its goal of being ergonomic. While the beauty of fully tacit code is a worthy goal, some problems involve data flows that are inherently complex, and so some kind of labeling system may be necessary to make such problems workable. 

### Box Ergonomics 

While I've explored alternatives, I've come to the conclusion that nested arrays are a necessary pest. The data we work with is often nested or ragged, and while there are ways to represent such data with flat structures, those representations are cumbersome in their own ways. 

And so boxes are likely here to stay. However, I do think some design work can be done to improve their ergonomics. Currently, Uiua's boxes are very similar to J's, but I think it may be worth it to make their usage a bit more implicit in some cases, closer to the nested arrays of APL or BQN. 

### System APIs 

The current [system functions](https://uiua.org/docs/system) are useful and _mostly_  work. There are definitely implementation gaps which need to be filled. There are a good number of missing filesystem operations, and some other things like UDP sockets and proper interaction with child processes still need to be implemented. 

### FFI 

An FFI system similar to [BQN's](https://mlochbaum.github.io/BQN/spec/system.html#foreign-function-interface) is planned. This will allow Uiua to call into C libraries and will enable a lot more functionality.

</page>

<page url="https://www.uiua.org/docs/duplicate">

# [. duplicate](/docs/duplicate)

### Monadic 2-output function

Duplicate the top value on the stack

```uiua
[. 1 2 3 4]
```

```output
[1 1 2 3 4]
```
  
[. duplicate](/docs/duplicate) is often used in examples to show both the input and output of a function.

```uiua
√.144
```

```output
144
12
```

```uiua
.[1 2 3 4]
+1⇌
```

```output
[1 2 3 4]
[5 4 3 2]
```
  
[. duplicate](/docs/duplicate) is often combined with [: flip](/docs/flip) to process a single value two different ways.

For example, maybe you want to find all the numbers in an array that lie within a certain range.

Here, we use [× multiply](/docs/multiply) as a logical AND function.

```uiua
×≥5:≤8. [6 2 5 9 6 5 0 4]
```

```output
[1 0 1 0 1 1 0 0]
```
  
[. duplicate](/docs/duplicate) can be used to make a monadic left-hook, such as in this palindrome checker:

```uiua
≍⇌. "friend"
```

```output
0
```

```uiua
≍⇌. "racecar"
```

```output
1
```

Another commonly hooked function is [▽ keep](/docs/keep).

```uiua
▽=0◿3. [1 4 2 3 9 1 0 6 2 6 3]
```

```output
[3 9 0 6 6 3]
```

</page>

<page url="https://www.uiua.org/docs/mask">

# [⦷ mask](/docs/mask)

### Dyadic function

Mask the occurences of one array in another

Occurences of the first array in the second array will be marked with increasing numbers.

While [⌕ find](/docs/find) only marks the start of each occurence, [⦷ mask](/docs/mask) marks the entire occurence.

```uiua
⦷ "ab" "abracadabra"
```

```output
[1 1 0 0 0 0 0 2 2 0 0]
```

```uiua
⦷ [1 2 3].[0 1 2 3 1 2 3 4 5 1 2 3 4 5 6]
```

```output
[0 1 2 3 1 2 3 4 5 1 2 3 4 5 6]
[0 1 1 1 2 2 2 0 0 3 3 3 0 0 0]
```

Increasing numbers are used so that adjacent occurences can be distinguished.

An occurence that would overlap with a previous occurence is not marked.

```uiua
⦷ [3 4 3 4].[0 3 4 3 4 3 4 0 0 3 4 3 4 0]
```

```output
[0 3 4 3 4 3 4 0 0 3 4 3 4 0]
[0 1 1 1 1 0 0 0 0 2 2 2 2 0]
```
  
Arbitrary rank arrays are supported.

The first array's rank must be [≤](/docs/less or equal) the rank of the second.

```uiua
⦷,, 3_4 ↯2_3⇡6
```

```output
╭─       
╷ 0 1 2  
  3 4 5  
        ╯
[3 4]
╭─       
╷ 0 0 0  
  1 1 0  
        ╯
```

```uiua
⦷,, [1_2 5_6] [1_2_3_4 5_6_1_2 7_8_5_6 4_3_1_2]
```

```output
╭─         
╷ 1 2 3 4  
  5 6 1 2  
  7 8 5 6  
  4 3 1 2  
          ╯
╭─     
╷ 1 2  
  5 6  
      ╯
╭─         
╷ 1 1 0 0  
  1 1 2 2  
  0 0 2 2  
  0 0 0 0  
          ╯
```
  
[⦷ mask](/docs/mask) works well with [⊜ partition](/docs/partition) in a way that [⌕ find](/docs/find) does not.

Here, we [¬ not](/docs/not) the [⦷ mask](/docs/mask) of a non-scalar delimiter to split a string.

```uiua
⊜∘ ¬⦷" - ". "foo - bar - baz"
```

```output
╭─       
╷ "foo"  
  "bar"  
  "baz"  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/greater%20than">

# [\> greater than](/docs/greater than)

### Dyadic pervasive function

Compare for greater than

The second value is checked to be greater than the first.

This is so you can think of `>` `x` as a single unit.

```uiua
>1 2
```

```output
1
```

```uiua
>5 5
```

```output
0
```

```uiua
>7 3
```

```output
0
```

```uiua
>2 [1 2 3]
```

```output
[0 0 1]
```

```uiua
> [1 2 2] [1 2 3]
```

```output
[0 0 1]
```

</page>

<page url="https://www.uiua.org/docs/&w">

# [&w](/docs/&w) \- write

### Dyadic 0-output function

Write an array to a stream

If the stream is a file, the file may not be written to until it is closed with [&cl](/docs/&cl).

The stream handle `1` is stdout.

The stream handle `2` is stderr.

```uiua
&cl &w "Hello, world!" . &fc "file.txt"
&fras "file.txt"
```

```output
"Hello, world!"
```

</page>

<page url="https://www.uiua.org/docs/transpose">

# [⍉ transpose](/docs/transpose)

### Monadic function

Rotate the shape of an array

```uiua
⍉.[1_2 3_4 5_6]
```

```output
╭─     
╷ 1 2  
  3 4  
  5 6  
      ╯
╭─       
╷ 1 3 5  
  2 4 6  
        ╯
```

```uiua
⍉.[[1_2 3_4] [5_6 7_8]]
```

```output
╭─     
╷ 1 2  
╷ 3 4  
       
  5 6  
  7 8  
      ╯
╭─     
╷ 1 5  
╷ 2 6  
       
  3 7  
  4 8  
      ╯
```

[⍉ transpose](/docs/transpose) works through boxes.

```uiua
⍉ □[1_2_3 4_5_6]
```

```output
╓─     
╟ 1 4  
  2 5  
  3 6  
      ╜
```

```uiua
≡⍉ {[1_2 3_4] [1_2_3 4_5_6]}
```

```output
╭─                 
          ╓─       
  ╓─      ╟ 1 4    
  ╟ 1 3     2 5    
    2 4     3 6    
        ╜       ╜  
                  ╯
```

[° un](/docs/un)[⍉ transpose](/docs/transpose) transposes in the opposite direction.

This is useful for arrays with rank [\>](/docs/greater than)`2`.

```uiua
°⍉ .⊟.[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
╷ 4 5 6  
         
  1 2 3  
  4 5 6  
        ╯
╭─     
╷ 1 4  
╷ 1 4  
       
  2 5  
  2 5  
       
  3 6  
  3 6  
      ╯
```
  
[△](/docs/shape)[⍉](/docs/transpose) is always equivalent to [↻](/docs/rotate)`1`[△](/docs/shape).

```uiua
[1_2 3_4 5_6]
↻1△ .
△⍉  :
```

```output
[2 3]
[2 3]
```
  
Multiple [⍉ transpose](/docs/transpose)s, as well as [≡ rows](/docs/rows)[⍉ transpose](/docs/transpose), are optimized in the interpreter to only do a single operation.

</page>

<page url="https://www.uiua.org/tutorial/arrays">

# Arrays

Uiua is, first and foremost, an array language. The only composite data type is the multidimensional array. Arrays have a lot of nice properties, and the language's built-in functions are designed to make it easy to work with them. If you've only ever programmed in non-array languages, then this will be a completely foreign paradigm. In most array languages, most data structures and control flow are replaced with operations on arrays.

## [Creating Arrays](#creating-arrays)

Other than with functions, Uiua has two ways to create arrays. They are called _strand notation_ and _stack notation_.

**Strand notation** uses underscores to connect elements.

```uiua
1_2_3
```

```output
[1 2 3]
```

```uiua
"Hello"_"World"
```

```output
╭─         
╷ "Hello"  
  "World"  
          ╯
```

Strand notation is good when you want to create short and/or simple arrays. For longer or more complex arrays, you can use stack notation.

**Stack notation** uses `[]` brackets to group elements.

```uiua
[1 2 3]
```

```output
[1 2 3]
```

```uiua
[¯5 37 42 π]
```

```output
[¯5 37 42 π]
```

What's cool about stack notation is that it is _not_ just a way to list elements. The code between the brackets runs from right to left as it normally would. When it is done, any items on the stack higher than when it started are put into the array. This gives you some cool ways to create arrays.

Remember that [. duplicate](/docs/duplicate) duplicates the top item on the stack.

```uiua
[...5]
```

```output
[5 5 5 5]
```

```uiua
[×2.×2.×2.×2 .2]
```

```output
[32 16 8 4 2]
```

```uiua
[+1 2 +3 4]
```

```output
[3 7]
```

Any functions inside the brackets will "pull in" their arguments from outside if there are not enough inside.

```uiua
[+] 1 9
```

```output
[10]
```

```uiua
[...] 7
```

```output
[7 7 7 7]
```

```uiua
[+×2] 20 2
```

```output
[42]
```

You can also use stack notation to make multidimensional arrays.

```uiua
[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

```uiua
[...[1 2 3]]
```

```output
╭─       
╷ 1 2 3  
  1 2 3  
  1 2 3  
  1 2 3  
        ╯
```

Unlike strand notation, stack notation may span multiple lines. The lines are still executed right-to-left, but they are executed bottom-to-top so that the arrays come out the same way they look in the code.

```uiua
[1 2 3
 4 5 6
 7 8 9]
```

```output
[1 2 3 4 5 6 7 8 9]
```

```uiua
[[1 2 3]
 [4 5 6]
 [7 8 9]]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
```

More precisely, stack notation [⊟ couple](/docs/couple)s the first two stack items created between the `[]`s and [⊂ join](/docs/join)s the rest to that coupling. You may see this refered to in error messages.

## [](#shape-len)[△ shape](/docs/shape) and [⧻ length](/docs/length)

Other than their data, arrays also have a property called their **shape**. Shape is a list of non-negative integers that describes the array's size along each of its axes.

We can get the array's shape with the [△ shape](/docs/shape) function. It's a triangle because a triangle is a shape.

```uiua
△[1 2 3]
```

```output
[3]
```

```uiua
△5
```

```output
[]
```

```uiua
△[[1 2 3] [4 5 6]]
```

```output
[2 3]
```

```uiua
△[...[1 2 3]]
```

```output
[4 3]
```

Arrays with 0 dimensions (an empty [△ shape](/docs/shape)) are called **scalars**.

Arrays with 1 dimension are often called **lists** or **vectors**.

Arrays with 2 dimensions are often called **tables** or **matrices**.

While there are not common names for arrays with 3 or more dimensions, Uiua supports arrays with an arbitrary number of axes.

The first element of the shape is the number of _rows_ of the array. _Rows_ does not refer just to the rows of a matrix or table. It is the groups of elements along the leading axis of the array. For lists, this is just the individual elements. For matrices, it is the rows as you might traditionally think of them. But arrays with a higher number of dimensions have rows as well. For example, in an array with 3 dimensions, each row is a matrix.

From shape we can derive two closely-related properties called **length** and **rank**.

[⧻ length](/docs/length) is the number of rows in the array. Length is always equal to the first number in the shape (or 1 if the shape is empty).

**Rank** is the number of dimensions of the array. It is equivalent to the [⧻ length](/docs/length) of the [△ shape](/docs/shape).

```uiua
 △[1_2_3 4_5_6 7_8_9]
 ⧻[1_2_3 4_5_6 7_8_9]
⧻△[1_2_3 4_5_6 7_8_9] # Rank
```

```output
[3 3]
3
2
```

## [Pretty Array Output](#output)

The online editor and native interpreter both pretty-print any values that remain on the stack when a program is finished. (This can be invoked manually using the [&s](/docs/&s) function.)

To understand how the pretty-printed output corresponds to the actual array, we can use [↯ reshape](/docs/reshape) to create a multidimensional array. [↯ reshape](/docs/reshape) uses its first argument as a new shape for its second argument.

Here, we create a [⇡ range](/docs/range) array of all the numbers up to `24` and turn it into a 3-dimensional array with the shape `[2 3 4]`.

```uiua
↯2_3_4 ⇡24
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
```

Notice there are `2` big cells, each with `3` rows of `4` elements.

This expands to any number of dimensions. The more dimensions, the more space between the cells representing earlier axes.

```uiua
↯2_3_2_5 ⇡60
```

```output
╭─                
╷  0  1  2  3  4  
╷  5  6  7  8  9  
╷                 
  10 11 12 13 14  
  15 16 17 18 19  
                  
  20 21 22 23 24  
  25 26 27 28 29  
                  
  30 31 32 33 34  
  35 36 37 38 39  
                  
  40 41 42 43 44  
  45 46 47 48 49  
                  
  50 51 52 53 54  
  55 56 57 58 59  
                 ╯
```

## [Pervasion](#pervasion)

Most operations that apply to scalars are what is called _pervasive_ when it comes to arrays. This means that the operation automatically applies to every item in the array.

```uiua
+1 1_2_3
```

```output
[2 3 4]
```

```uiua
√[4 9 16]
```

```output
[2 3 4]
```

```uiua
+1_2_3 4_5_6
```

```output
[5 7 9]
```

When doing a pervasive operation on two arrays, the shape of one array must be the _prefix_ of the shape of the other.

```uiua
+[1 2] [3 4 5]
```

```output
Error: Shapes [2] and [3] do not match
  at 1:1
1 | +[1 2] [3 4 5]
    ─
```

Notice here that the shape of the first array is a prefix of the shape of the second array.

```uiua
△10_20
      △[3_4_5 6_7_8]
+10_20 [3_4_5 6_7_8]
```

```output
[2]
[2 3]
╭─          
╷ 13 14 15  
  26 27 28  
           ╯
```

If you want to do some pervasive operation on arrays whose shapes do not match, you can set a default value with [⬚ fill](/docs/fill). Any places where the shapes don't match will be filled in with that value.

```uiua
⬚10+ [1 2] [3 4 5 6 7]
```

```output
[4 6 15 16 17]
```

[⬚ fill](/docs/fill) can be used in a lot of other cases. See its documentation for more.

Pervasive operations are optimized in the interpreter to be very fast. You should prefer to use them whenever possible.

## [Useful Array Operations](#useful-array-operations)

You don't need to memorize all of these right now. This is just a brief introduction to some of the array operations so that you won't be surprised when you see them later.

If you ever see a glyph that you don't recognize in an example, you can hold ctrl/⌘ and mouse over it in the editor to learn its name.

You can ctrl/⌘-click any glyph in the editor to see its documentation.

You can also click the names of functions in the site text to see their documentation.

[⊟ couple](/docs/couple) turns two arrays into rows of a new array.

```uiua
⊟ 1_2_3 [4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

[⊢ first](/docs/first) gets the first row of an array.

```uiua
⊢ [4 7 1]
```

```output
4
```

```uiua
⊢ [1_2 3_4 5_6]
```

```output
[1 2]
```

[⇌ reverse](/docs/reverse) reverses the rows of an array.

```uiua
⇌ [4 7 1]
```

```output
[1 7 4]
```

```uiua
⇌ [1_2 3_4 5_6]
```

```output
╭─     
╷ 5 6  
  3 4  
  1 2  
      ╯
```

[↻ rotate](/docs/rotate) rotates the rows of an array by some amount.

```uiua
↻2 [1 2 3 4 5]
```

```output
[3 4 5 1 2]
```

[♭ deshape](/docs/deshape) flattens an array into a 1D array.

```uiua
♭ .[1_2 3_4 5_6]
```

```output
╭─     
╷ 1 2  
  3 4  
  5 6  
      ╯
[1 2 3 4 5 6]
```

[↙ take](/docs/take) and [↘ drop](/docs/drop) isolate part of an array.

```uiua
↙3 [1 2 3 4 5]
↘3 [1 2 3 4 5]
```

```output
[1 2 3]
[4 5]
```

[⊡ pick](/docs/pick) indexes an array. Longer indices index deeper into the array.

Uiua is 0-indexed.

```uiua
⊡2 [3 8 4 1]
```

```output
4
```

```uiua
⊡1   [1_2_3 4_5_6]
⊡1_1 [1_2_3 4_5_6]
```

```output
[4 5 6]
5
```

[⊏ select](/docs/select) uses a list of indices to select rows of an array.

```uiua
⊏ [0 2 1 1 2] ↯3_3⇡9
```

```output
╭─       
╷ 0 1 2  
  6 7 8  
  3 4 5  
  3 4 5  
  6 7 8  
        ╯
```

```uiua
⊏[3 5 0 1 7 8 9 5 1 2 5 3 10] "their sinks"
```

```output
"i think he is"
```

## [The Array Model](#array-model)

For curious array aficionados, Uiua uses an array model resembling [J's Boxed array model](https://aplwiki.com/wiki/Box).

All arrays are flat and homogenous. Arrays always have a rectangular shape, meaning that all rows along an axis always have the same length. Different types of data, like numbers and characters, cannot be mixed in the same array.

However, there is an escape hatch for when you really want jagged, nested, or mixed-type arrays. In Uiua, an array of heterogeneous values can be simulated with an array of _boxes_.

The array below cannot be constructed normally because its rows have different [△ shape](/docs/shape)s.

```uiua
[1 2 [7 8 9]]
```

```output
Error: Cannot add rank 1 row to rank 1 array
  at 1:1
1 | [1 2 [7 8 9]]
    ─────────────
```

By using [□ box](/docs/box), we can turn any value into a **box** that contains that value. We can then put these boxes into an array together.

```uiua
[□1 □2 □[7 8 9]]
```

```output
{1 2 [7 8 9]}
```

The `{}`s in the output hint at some syntax that will be introduced shortly.

[° un](/docs/un)[□ box](/docs/box) extracts a [□ box](/docs/box)ed value.

```uiua
°□ .□[1 2 3]
```

```output
⟦1 2 3⟧
[1 2 3]
```

The `⟦⟧`s indicate that a list is [□ box](/docs/box)ed.

[□ box](/docs/box)ed strings also have special output delimiters, using `⌜⌟`s.

```uiua
□"banana"
```

```output
⌜banana⌟
```

Having to write [□](/docs/box) everywhere is annoying, and so...

## [Nested Arrays](#nested-arrays)

Uiua has a special syntax for making arrays where every item is [□ box](/docs/box)ed.

Using `{}`s instead of `[]`s for stack array notation will automatically [□ box](/docs/box) every item.

```uiua
{1 2 [7 8 9]}
```

```output
{1 2 [7 8 9]}
```

This is very useful for making lists of strings.

```uiua
["Uiua" "APL" "J" "BQN" "K" "Q"] # Fails
```

```output
Error: Cannot couple arrays with shapes [4] and [3]
  at 1:1
1 | ["Uiua" "APL" "J" "BQN" "K" "Q"] # Fails
    ────────────────────────────────
```

```uiua
{"Uiua" "APL" "J" "BQN" "K" "Q"} # Works!
```

```output
{"Uiua" "APL" "J" "BQN" "K" "Q"}
```

Functions that require their arguments to have matching types may require [□ box](/docs/box)ing an argument.

For example, to check if a string is in a list of [□ box](/docs/box)ed strings with [∊ member](/docs/member), you would need to [□ box](/docs/box) the string first.

```uiua
Langs ← {"Uiua" "APL" "J" "BQN" "K" "Q"}
∊ □"APL" Langs
```

```output
1
```

Pervasive functions work through boxes and preserve the maximum [□ box](/docs/box) depth of their arguments.

```uiua
¯ 1
¯ □1
¯ □□1
```

```output
¯1
□¯1
□□¯1
```

```uiua
+1 4
+1 □4
+1 □□4
+□□1 □4
```

```output
5
□5
□□5
□□5
```

```uiua
×10 {1_2_3 4_5 6}
```

```output
{[10 20 30] [40 50] 60}
```

There is an exception for comparison functions, which compare lexicographically.

```uiua
=  [1 2 3]  [1 2 5]
= □[1 2 3] □[1 2 5]
>  [1 2 3]  [1 2 5]
> □[1 2 3] □[1 2 5]
>  "banana"  "orange"
> □"banana" □"orange"
> □"banana"  "orange"
```

```output
[1 1 0]
0
[0 0 1]
1
[1 1 0 1 0 1]
1
{[1 1 1 1 1 1] [1 1 1 1 1 1] [0 0 0 0 0 0] [1 1 0 1 0 1] [1 1 0 1 0 1] [1 1 0 1 0 1]}
```

Non-pervasive functions often require [° un](/docs/un)[□ box](/docs/box)ing the arguments to get at the value you want.

Consider this difference:

```uiua
△    ⊢{1_2_3 5_6}
△ °□ ⊢{1_2_3 5_6}
```

```output
[]
[3]
```

For more about working with box arrays, see [□ box](/docs/box)'s documentation.

</page>

<page url="https://www.uiua.org/docs/backward">

# [¨ backward](/docs/backward)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Call a function with its arguments reversed

This is a modifier version of [: flip](/docs/flip).

It is experimental because it is unclear whether this is a desirable direction for the language.

```uiua
# Experimental!
¨⊂ 1 2
```

```output
[2 1]
```

</page>

<page url="https://www.uiua.org/docs/classify">

# [⊛ classify](/docs/classify)

### Monadic function

Assign a unique index to each unique element in an array

```uiua
⊛7_7_8_0_1_2_0
```

```output
[0 0 1 2 3 4 2]
```

```uiua
⊛"Hello, World!"
```

```output
[0 1 2 2 3 4 5 6 3 7 2 8 9]
```
  
When combined with [⊕ group](/docs/group), you can do things like counting the number of occurrences of each character in a string.

```uiua
$ Count the characters in this string
⊕($"_ _"⊃⊢⧻) ⊛.⊏⍏.
```

```output
╭─       
╷ "  5"  
  "C 1"  
  "a 2"  
  "c 2"  
  "e 2"  
  "g 1"  
  "h 3"  
  "i 3"  
  "n 3"  
  "o 1"  
  "r 3"  
  "s 3"  
  "t 5"  
  "u 1"  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/pick">

# [⊡ pick](/docs/pick)

### Dyadic function

Index a row or elements from an array

An index with rank `0` or `1` will pick a single row or element from an array.

```uiua
⊡ 2 [8 3 9 2 0]
```

```output
9
```

```uiua
⊡ 1_1 .[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
5
```
  
If the index's rank is `2` or greater, then multiple rows or elements will be picked.

```uiua
⊡ [1_2 0_1] [1_2_3 4_5_6]
```

```output
[6 2]
```
  
[⍜ under](/docs/under)[⊡ pick](/docs/pick) can be used to modify the value at an index.

```uiua
⍜⊡(×10) 2 [8 3 9 2 0]
```

```output
[8 3 90 2 0]
```

This works with multiple and/or deeper indices.

```uiua
⍜⊡(×10) [2_1 0_2] +1↯3_4⇡12
```

```output
╭─             
╷ 1   2 30  4  
  5   6  7  8  
  9 100 11 12  
              ╯
```

To simply set a value, you can use [⍜ under](/docs/under)[⊡ pick](/docs/pick)[◌ pop](/docs/pop).

```uiua
⍜⊡◌ 2 [8 3 9 2 0] 42
```

```output
[8 3 42 2 0]
```
  
For index rank `2` or greater, it should hold that [⊡](/docs/pick)[⇡](/docs/range)[△](/docs/shape)[.](/docs/duplicate)`x` is equivalent to `x`.

```uiua
⊡⇡△. [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/&invk">

# [&invk](/docs/&invk) \- invoke

### Monadic function

Invoke a path with the system's default program

</page>

<page url="https://www.uiua.org/docs/&rs">

# [&rs](/docs/&rs) \- read to string

### Dyadic function

Read characters formed by at most n bytes from a stream

Expects a count and a stream handle.

The stream handle `0` is stdin.

```uiua
&rs 4 &fo "example.txt"
```

```output
"This"
```

Using [∞ infinity](/docs/infinity) as the count will read until the end of the stream.

```uiua
&rs ∞ &fo "example.txt"
```

```output
"This is a simple text file for \nuse in example Uiua code ✨"
```
  
[&rs](/docs/&rs) will attempt to read the given number of _bytes_ from the stream.

If the read bytes are not valid UTF-8, up to 3 additional bytes will be read in an attempt to finish a valid UTF-8 character.
  
See also: [&rb](/docs/&rb)

</page>

<page url="https://www.uiua.org/docs/identity">

# [∘ identity](/docs/identity)

### Monadic function

Do nothing with one value

```uiua
∘ 5
```

```output
5
```
  
[∘ identity](/docs/identity) is mostly useless on its own. See the [Advanced Stack Manipulation Tutorial](/tutorial/advancedstack) to understand what it is for.

</page>

<page url="https://www.uiua.org/docs/sqrt">

# [√ sqrt](/docs/sqrt)

### Monadic pervasive function

Take the square root of a number

```uiua
√4
```

```output
2
```

```uiua
√[1 4 9 16]
```

```output
[1 2 3 4]
```

```uiua
√¯1
```

```output
NaN
```

You can only take the square root of a negative number if it is complex.

```uiua
√  ¯4
√ℂ0¯4
```

```output
NaN
2i
```

</page>

<page url="https://www.uiua.org/docs/match">

# [≍ match](/docs/match)

### Dyadic function

Check if two arrays are exactly the same

```uiua
≍ 1_2_3 [1 2 3]
```

```output
1
```

```uiua
≍ 1_2_3 [1 2]
```

```output
0
```

</page>

<page url="https://www.uiua.org/docs/find">

# [⌕ find](/docs/find)

### Dyadic function

Find the occurences of one array in another

A `1` marker will be placed the the start of each occurence of the first array in the second array.

```uiua
⌕ 5 [1 8 5 2 3 5 4 5 6 7]
```

```output
[0 0 1 0 0 1 0 1 0 0]
```

```uiua
⌕ "ab" "abracadabra"
```

```output
[1 0 0 0 0 0 0 1 0 0 0]
```

If the searched-in array is multidimensional, the `1` marker will be placed in the minimum index "top left" corner.

```uiua
⌕ 1_2 . ↯4_4⇡3
```

```output
╭─         
╷ 0 1 2 0  
  1 2 0 1  
  2 0 1 2  
  0 1 2 0  
          ╯
╭─         
╷ 0 1 0 0  
  1 0 0 0  
  0 0 1 0  
  0 1 0 0  
          ╯
```

```uiua
⌕ [1_2 2_0] . ↯4_4⇡3
```

```output
╭─         
╷ 0 1 2 0  
  1 2 0 1  
  2 0 1 2  
  0 1 2 0  
          ╯
╭─         
╷ 0 1 0 0  
  1 0 0 0  
  0 0 1 0  
  0 0 0 0  
          ╯
```
  
If you want to mark the entire occurence, use [⦷ mask](/docs/mask) instead.

</page>

<page url="https://www.uiua.org/docs/atangent">

# [∠ atangent](/docs/atangent)

### Dyadic pervasive function

Take the arctangent of two numbers

This takes a `y` and `x` argument and returns the angle in radians in the range `(-π, π]`.

```uiua
∠ 1 0
```

```output
η
```

```uiua
∠ ¯1 0
```

```output
¯η
```

```uiua
∠ √2 √2
```

```output
τ/8
```
  
[° un](/docs/un)[∠ atangent](/docs/atangent) gives the [∿ sine](/docs/sine) and `cosine` of an angle.

```uiua
°∠ 0
```

```output
1
0
```

```uiua
°∠ η
```

```output
0.00…06123233995736766
1
```

```uiua
°∠ π
```

```output
¯1
0.00…012246467991473532
```

```uiua
°∠ ÷3π
```

```output
0.500…01
0.8660254037844386
```

</page>

<page url="https://www.uiua.org/docs/un">

# [° un](/docs/un)

### Monadic modifier

Invert the behavior of a function

A list of all [° un](/docs/un)\-compatible functions can be found [below](#uns).
  
```uiua
°√ 5
```

```output
25
```

Two functions that are invertible alone can be inverted together

```uiua
°(+1√) 5
```

```output
16
```

Most functions are not invertible.

[⍜ under](/docs/under) also uses inverses, but expresses a different pattern and is generally more powerful.

A function's [° un](/docs/un)\-inverse can be set with [setinv](/docs/setinv).

For more about inverses, see the [Inverse Tutorial](/tutorial/inverses).

## [](#uns)[° un](/docs/un)\-compatible functions

These functions are also compatible with [⍜ under](/docs/under).

See the [similar table](/docs/under#unders) for [⍜ under](/docs/under) for more.

| Pattern                                              | Value? \*            | Notes                                                                                                                                 | Example                                   |
| ---------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [° un](/docs/un)                                     | No                   | °°⊟ 1 2\[1 2\]                                                                                                                        |                                           |
| Constant                                             | Optional             | Pattern match                                                                                                                         | °8 8                                      |
| [. duplicate](/docs/duplicate)                       | No                   | Pattern match                                                                                                                         | °. 4 44                                   |
| [↧ minimum](/docs/minimum)                           | Required             | Pattern match                                                                                                                         | °(↧5) 33                                  |
| [↥ maximum](/docs/maximum)                           | Required             | Pattern match                                                                                                                         | °(↥3) 55                                  |
| [∘ identity](/docs/identity)                         | No                   | Self inverse                                                                                                                          | °∘ 55                                     |
| [: flip](/docs/flip)                                 | No                   | Self inverse                                                                                                                          | °: 2 52 5                                 |
| [¯ negate](/docs/negate)                             | No                   | Self inverse                                                                                                                          | °¯ 5¯5                                    |
| [¬ not](/docs/not)                                   | No                   | Self inverse                                                                                                                          | °¬ 5¯4                                    |
| [√ sqrt](/docs/sqrt)                                 | No                   | °√ 525                                                                                                                                |                                           |
| [∿ sine](/docs/sine)                                 | No                   | Arcsine                                                                                                                               | °∿ 1η                                     |
| [+ add](/docs/add)                                   | Required             | °(+1) 54                                                                                                                              |                                           |
| [\- subtract](/docs/subtract)                        | Required             | °(-1) 56                                                                                                                              |                                           |
| [× multiply](/docs/multiply)                         | Required             | °(×2) 52.5                                                                                                                            |                                           |
| [÷ divide](/docs/divide)                             | Required             | °(÷2) 510                                                                                                                             |                                           |
| [ⁿ power](/docs/power)                               | Required             | °(ⁿ2) 366                                                                                                                             |                                           |
| [ₙ logarithm](/docs/logarithm)                       | Required             | °(ₙ2) 8256                                                                                                                            |                                           |
| [+](/docs/add)[.](/docs/duplicate)                   | No                   | °(+.) 105                                                                                                                             |                                           |
| [×](/docs/multiply)[.](/docs/duplicate)              | No                   | °(×.) 164                                                                                                                             |                                           |
| [∠ atangent](/docs/atangent)                         | No                   | [∿ sine](/docs/sine) and cosine                                                                                                       | °∠ π¯1 0.00…012246467991473532            |
| [ℂ complex](/docs/complex)                           | No                   | Complex part on top                                                                                                                   | °ℂ i0 1                                   |
| [⊟ couple](/docs/couple)                             | No                   | Array must have [⧻ length](/docs/length) 2                                                                                            | °⊟ \[1\_2\_3 4\_5\_6\]\[4 5 6\] \[1 2 3\] |
| \[[⊙](/docs/dip)[⊙](/docs/dip)…[∘](/docs/identity)\] | No                   | Array must have compatible [⧻ length](/docs/length)                                                                                   | °\[⊙⊙∘\] \[1 2 3\]3 2 1                   |
| {[⊙](/docs/dip)[⊙](/docs/dip)…[∘](/docs/identity)}   | No                   | Array must have compatible [⧻ length](/docs/length)                                                                                   | °{⊙⊙∘} {1 2\_3 4}4 \[2 3\] 1              |
| \[…\]                                                | No                   | °\[⇌\] \[\[1 2 3\]\]\[3 2 1\]                                                                                                         |                                           |
| {…}                                                  | No                   | °{:} {1 2\_3}1 \[2 3\]                                                                                                                |                                           |
| [□ box](/docs/box)                                   | No                   | No-op on non-scalars and non-boxes                                                                                                    | °□ □\[1 2 3\]\[1 2 3\]                    |
| [⇌ reverse](/docs/reverse)                           | No                   | °⇌ \[1 2 3 4\]\[4 3 2 1\]                                                                                                             |                                           |
| [△ shape](/docs/shape)                               | No                   | °△ \[2 2 4\]╭─              ╷  0  1  2  3   ╷  4  5  6  7                      8  9 10 11     12 13 14 15                 ╯           |                                           |
| [⍉ transpose](/docs/transpose)                       | No                   | °⍉ ↯2\_3\_2⇡12╭─         ╷ 0 2  4   ╷ 6 8 10                1 3  5     7 9 11            ╯                                            |                                           |
| [⋯ bits](/docs/bits)                                 | No                   | °⋯ \[1 0 1\]5                                                                                                                         |                                           |
| [⊚ where](/docs/where)                               | No                   | °⊚ \[1 4\]\[0 1 0 0 1\]                                                                                                               |                                           |
| [⋕ parse](/docs/parse)                               | No                   | °⋕ \[8 9 10 11 12\]{"8" "9" "10" "11" "12"}                                                                                           |                                           |
| [¤ fix](/docs/fix)                                   | No                   | °¤ \[\[1 2 3\]\]\[1 2 3\]                                                                                                             |                                           |
| [utf₈](/docs/utf₈)                                   | No                   | °utf \[240 159 145 139 32 72 105 33\]"👋 Hi!"                                                                                         |                                           |
| [csv](/docs/csv)                                     | No                   | °csv "1,2\\n3,4"╭─          ╷ ⌜1⌟ ⌜2⌟     ⌜3⌟ ⌜4⌟             ╯                                                                       |                                           |
| [↻ rotate](/docs/rotate)                             | Required             | °(↻1) \[1 2 3 4\]\[4 1 2 3\]                                                                                                          |                                           |
| [⊂ join](/docs/join)                                 | No                   | °⊂ \[1 2 3 4\]\[2 3 4\] 1                                                                                                             |                                           |
| [⊂ join](/docs/join)                                 | Required             | Pattern match                                                                                                                         | °(⊂1\_2) \[1 2 3 4\]\[3 4\]               |
| [▽ keep](/docs/keep)                                 | No                   | °▽ \[1 1 1 2 1 1 3 3\]\[1 2 1 3\] \[3 1 2 2\]                                                                                         |                                           |
| [⊏ select](/docs/select)                             | No                   | °⊏ "hello""hello" \[0 1 2 3 4\]                                                                                                       |                                           |
| [⊡ pick](/docs/pick)                                 | No                   | °⊡ \[1\_2\_3 4\_5\_6\]╭─        ╷ 1 2 3     4 5 6           ╯ ╭─      ╷ 0 0   ╷ 0 1     0 2             1 0     1 1     1 2         ╯ |                                           |
| [\\ scan](/docs/scan)                                | No                   | Only works with [+](/docs/add)[×](/docs/multiply)[\=](/docs/equals)[≠](/docs/not equals)                                              | °\\+ \[1 3 6 10 15\]\[1 2 3 4 5\]         |
| [/](/docs/reduce)[×](/docs/multiply)                 | No                   | Prime factors                                                                                                                         | °/× 60\[2 2 3 5\]                         |
| [⍥ repeat](/docs/repeat)                             | Required             | Inner function must be invertible                                                                                                     | °(⍥(×2)5) 102432                          |
| [⸮ trace](/docs/trace)                               | No                   | °⸮ 5┌╴°⸮ 1:2 ├╴5 └╴╴╴╴╴╴╴ 5                                                                                                           |                                           |
| [? stack](/docs/stack)                               | No                   | °? 5┌╴°? 1:2 ├╴5 └╴╴╴╴╴╴╴ 5                                                                                                           |                                           |
| [dump](/docs/dump)                                   | No                   | °dump△ \[2 3 4\]┌╴°dump 1:2 ├╴\[3\] └╴╴╴╴╴╴╴╴╴╴ \[2 3 4\]                                                                             |                                           |
| [◌ pop](/docs/pop)                                   | [⬚ fill](/docs/fill) | ⬚5°◌5                                                                                                                                 |                                           |
| [&ae](/docs/&ae)                                     | Optional             | Decodes bytes                                                                                                                         |                                           |
| [&ime](/docs/&ime)                                   | Optional             | Decodes bytes                                                                                                                         |                                           |
| [&gife](/docs/&gife)                                 | Optional             | Decodes bytes                                                                                                                         |                                           |
| [&clget](/docs/&clget)                               | No                   |                                                                                                                                       |                                           |
| [&clset](/docs/&clset)                               | No                   |                                                                                                                                       |                                           |

</page>

<page url="https://www.uiua.org/docs/tour">

# Uiua Language Tour

## [The Union of Two Paradigms](#the-union-of-two-paradigms)

Uiua is a programming language that incorporates two of the less-common programming paradigms: **array-oriented** and **stack-based**.

An **array-oriented** language is one where the primary data structure is the array. In array languages, many operations that can apply to a single value can also apply to every value in an array. This is known as _rank-polymorphism_.

A **stack-based** language is one where all operations manipulate a global stack of values. Functions pop values off the top of the stack, perform their calculation, then push the results back onto the stack.

In Uiua, functions work on a global stack of arrays.

That's enough introduction, let's see some code!

```uiua
+1 ×2 ⇡10
```

```output
[1 3 5 7 9 11 13 15 17 19]
```

Uiua code runs from [right to left](/docs/tour/../rtl), top to bottom. Operators are put to the _left_ of their arguments, rather than in-between.

This program makes an array of all the numbers less than 10, multiplies each one by 2, then adds 1 to each.

If you want to see how that works step-by-step, try clicking the arrows beside the Run button.

Now, I can already hear you asking, _"Wait, what is that funny arrow? How am I supposed to type the multiplication sign?"_

Unlike some other array languages, Uiua does not require a special keyboard configuration or an editor with custom keybindings. Instead, you can type either the ASCII symbol or the name of a built-in function, then the Uiua formatter will convert it to the correct Unicode glyph.

In this case, the ASCII symbol for multiplication is `*` and the name of the funny arrow is [⇡ range](/docs/range).

On this website, you can format by clicking **Run** or by pressing **Ctrl+Enter** with the cursor in the text area. Try it out!

```uiua
+1*2 range10
```

```output
[1 3 5 7 9 11 13 15 17 19]
```

You don't even have to type the whole name of a built-in function, just enough to disambiguate it from the others.

```uiua
ran10
```

```output
[0 1 2 3 4 5 6 7 8 9]
```

If you're ever not sure what a glyph is called, you can hold ctrl/⌘ and hover over it to see its name.

You can ctrl/⌘-click any glyph in the editor to see its documentation.

Click the `↧` on the right of the editor to see a list of all the built-in functions.

## [The Stack](#the-stack)

A number in Uiua code pushes its value to the stack. On the website's editor, the values on _top_ of the stack are displayed at the _bottom_. This is so that sequential lines of code show their result in the correct order.

```uiua
10 11
@c
+1 2
"Hello, World!"
# By the way, comments start with #
```

```output
11
10
@c
3
"Hello, World!"
```

If you like, you can put values on the stack first, then operate on them.

```uiua
×++ 1 2 3 4
```

```output
24
```

[. duplicate](/docs/duplicate) duplicates the top value on the stack.

```uiua
×.3
```

```output
9
```

[. duplicate](/docs/duplicate) is often used in the examples on this site to show both the input and output of a function.

```uiua
√.225
```

```output
225
15
```

For math functions where the order matters, like [\- subtract](/docs/subtract) and [÷ divide](/docs/divide), what would normally be the second argument is instead the first. This is so you can think of fragments like [\-](/docs/subtract)`2` as a single unit.

If you want them to work the other way, you can use [: flip](/docs/flip), which swaps the top two values on the stack.

```uiua
-3 10
-:3 10
```

```output
7
¯7
```

By the way, since `-` is for [\- subtract](/docs/subtract), use `` ` `` for negative numbers. The formatter will turn in into a nice `¯`.

```uiua
`10
```

```output
¯10
```

You can inspect the stack at any point with [? stack](/docs/stack).

```uiua
+1?×2?×.-3 5
```

```output
┌╴? 1:6
├╴4
└╴╴╴╴╴╴
┌╴? 1:3
├╴8
└╴╴╴╴╴╴

9
```

## [Arrays](#arrays)

So far, we have only talked about the stack part of Uiua. Now, let's talk about the most important part: Arrays!

An array is a rectangular collection of elements arranged along some number of axes.

An array with no axes is called a scalar. All the numbers in the examples above are scalars.

An array with one axis is often called a list or a vector. An array with two axes is often called a table or a matrix.

You can make simple lists by putting `_`s between the elements.

```uiua
1_2_3_4
```

```output
[1 2 3 4]
```

You can also just surround them with `[]`s.

```uiua
[5 6 7 8]
```

```output
[5 6 7 8]
```

But wait! You can put whatever code you want between the brackets! The code runs from right to left as normal, and any values pushed to the stack get put in the array!

```uiua
[×3 . -2 . 10]
```

```output
[24 8 10]
```

If you put arrays inside others, you can make arrays with multiple dimensions.

```uiua
[1_2_3 [4 5 6] 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
```

```uiua
[×3. 4_5_6]
```

```output
╭─          
╷ 12 15 18  
   4  5  6  
           ╯
```

Some operations are _pervasive_, which means they apply to every element of an array or every pair of elements between two arrays. All the math operators are pervasive!

```uiua
√[4 9 16]
```

```output
[2 3 4]
```

```uiua
×2 [1 2 3]
```

```output
[2 4 6]
```

```uiua
+ 1_2_3 4_5_6
```

```output
[5 7 9]
```

```uiua
× 2_10 [1_2_3 4_5_6]
```

```output
╭─          
╷  2  4  6  
  40 50 60  
           ╯
```

Arrays have a [△ shape](/docs/shape) that describes how many elements they have along each axis.

```uiua
△5
△[]
△[9 1 6]
△[4_π_9 1_5_∞]
```

```output
[]
[0]
[3]
[2 3]
```

The _rank_ of an array refers to the number of axes it has.

The [⧻ length](/docs/length) is the number of rows it has along its first axis.

```uiua
a ← [1_2_3_4 5_6_7_8 9_10_11_12]
△a
⧻a
⧻△a # rank
```

```output
[3 4]
3
2
```

If you want to type that fancy `←` so you can give names to arrays, you can type `=` after a name at the start of a line, and the formatter will convert it for you.

```uiua
x = 5
+x x
```

```output
10
```

`←` just pops the first thing off the stack and assigns it to the name on the left, so if there is already a value on the stack, you don't actually need anything on the right.

```uiua
×2 [2 3 4]
x ←
x
```

```output
[4 6 8]
```

Names are case-sensitive and can only contain letters.

## [Basic Array Operations](#basic-array-operations)

You can reverse an array's rows with [⇌ reverse](/docs/reverse).

```uiua
rev[1 2 3] # Run to format!
```

```output
[3 2 1]
```

```uiua
⇌[1_2_3 4_5_6]
```

```output
╭─       
╷ 4 5 6  
  1 2 3  
        ╯
```

You can concatenate two arrays with [⊂ join](/docs/join).

```uiua
⊂1 [2 3 4]
⊂[1 2 3] [4 5 6]
```

```output
[1 2 3 4]
[1 2 3 4 5 6]
```

You can make two arrays the rows of a new array with [⊟ couple](/docs/couple).

```uiua
⊟[1 2 3] [4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

You can get the first element of an array with [⊢ first](/docs/first).

```uiua
⊢[1 2 3]
```

```output
1
```

```uiua
fir[1_2_3 4_5_6]
```

```output
[1 2 3]
```

[↙ take](/docs/take) and [↘ drop](/docs/drop) can be used to get just part of an array.

```uiua
↙3 [1 2 3 4 5]
↘3 [1 2 3 4 5]
```

```output
[1 2 3]
[4 5]
```

[↯ reshape](/docs/reshape) changes the shape of an array while keeping the elements in the same order.

```uiua
↯3_3 .⇡9
```

```output
[0 1 2 3 4 5 6 7 8]
╭─       
╷ 0 1 2  
  3 4 5  
  6 7 8  
        ╯
```

[⍉ transpose](/docs/transpose) rotates the axes of an array.

```uiua
trans.[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─     
╷ 1 4  
  2 5  
  3 6  
      ╯
```

Uiua has a lot of built-in functions like these. You can explore their documentation on the [main docs page](/docs#functions).

## [Functions](#functions)

If you bind a name with `←` and the code on the right does not have enough arguments to run, the code will be bound as a function and will not run until the name is used.

```uiua
F ← +1
F5
```

```output
6
```

```uiua
👋 ← ⊂"Hello, "
👋"World"
```

```output
"Hello, World"
```

## [Modifiers](#modifiers)

Modifiers (called operators or adverbs in some other array languages) are functions that take other functions as arguments. Modifiers are parsed so that if their function argument(s) immediately follow them, the function is run inside the modifier rather than before it.

[/ reduce](/docs/reduce) is a modifier many array-language aficionados will be familiar with. It takes its function and applies it "between" the items of an array.

One basic use of [/ reduce](/docs/reduce) is to sum an array.

```uiua
/+ [1 2 3 4 5]
```

```output
15
```

It works on multi-dimensional arrays too! In this case, it adds each row to the next, effectively summing along the columns.

```uiua
/+ .[1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
[12 15 18]
```

This works with any function. For example, you can use [↥ maximum](/docs/maximum) instead of [+ add](/docs/add) to get the maximum of each column rather than the sum.

```uiua
/↥ [1_2_3 4_5_2 3_1_8]
```

```output
[4 5 8]
```

[≡ rows](/docs/rows) applies a function to each row of an array.

```uiua
x ← [1_2_3 4_5_6]
  x
 ⇌x
≡⇌x
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─       
╷ 4 5 6  
  1 2 3  
        ╯
╭─       
╷ 3 2 1  
  6 5 4  
        ╯
```

[≡ rows](/docs/rows) also works _between_ two arrays if it is given a dyadic function like [⊂ join](/docs/join).

```uiua
≡⊂ [1_2 3_4] [5_6 7_8]
```

```output
╭─         
╷ 1 2 5 6  
  3 4 7 8  
          ╯
```

There are a bunch of other modifiers that are useful in different situations. You can find a [list of them](/docs/modifier) on the main docs page.

## [Inline Functions](#inline-functions)

If you need a more complex function for a modifier, you can make an inline function by surrounding code with `()`s.

Let's use [∵ each](/docs/each) to get the sum of all the numbers up to each element of an array.

For [∵ each](/docs/each) element, we'll [+ add](/docs/add)`1`, get the [⇡ range](/docs/range) up to that number, then [/ reduce](/docs/reduce) it with [+ add](/docs/add).

```uiua
∵(/+ ⇡ +1) .[1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
╭─          
╷  1  3  6  
  10 15 21  
  28 36 45  
           ╯
```

## [](#fill-and-nested-arrays)[⬚ fill](/docs/fill) and Nested Arrays

Here is an array that cannot be constructed normally because its rows have different [△ shape](/docs/shape)s.

```uiua
[1 2_3_4 5_6]
```

```output
Error: Cannot couple arrays with shapes [] and [3]
  at 1:1
1 | [1 2_3_4 5_6]
    ─────────────
```

One way to make this array work is to use the [⬚ fill](/docs/fill) modifier. You give it a fill value and a function or array that would fail with mismatched shapes, and it will fill in the missing values with the fill value.

```uiua
⬚0[1 2_3_4 5_6]
```

```output
╭─       
╷ 1 0 0  
  2 3 4  
  5 6 0  
        ╯
```

[⬚ fill](/docs/fill) works with lots of functions. Another one is [↙ take](/docs/take) when the amount you are taking is more than the length of the array.

```uiua
⬚π↙ 5 [1 2 3]
```

```output
[1 2 3 π π]
```
  
[⬚ fill](/docs/fill) is nice, but you don't always want to fill in the missing elements. Sometimes you need to mix values of different shapes or types in an array. To understand Uiua's solution to this problem, you must first understand its _array model_.

Uiua has what is called a _flat_ array model. Arrays must be rectangular and cannot mix types. However, the [□ box](/docs/box) function can turn any array into a _box_ element that can be put in an array with other boxes. That value can then be extracted with [° un](/docs/un)[□ box](/docs/box).

```uiua
[□1 □2_3_4 □5_6]
```

```output
{1 [2 3 4] [5 6]}
```

Having to use [□ box](/docs/box) on every value is kind of annoying, so there is a special syntax for [□ box](/docs/box) arrays that uses `{}`s instead of `[]`s.

```uiua
{1 2_3_4 5_6}
```

```output
{1 [2 3 4] [5 6]}
```

Pervasive functions work on [□ box](/docs/box)ed elements without needing to [° un](/docs/un)[□ box](/docs/box) them.

```uiua
+5 {1 2_3_4 5_6}
```

```output
{6 [7 8 9] [10 11]}
```

For more complex operations, you can use to use the [⍚ inventory](/docs/inventory) modifier, which calls a function on the content of each box.

```uiua
{"dog" "cat" "fish"}
⍚(⊂⇌.).
```

```output
{"dog" "cat" "fish"}
{"goddog" "taccat" "hsiffish"}
```

## [Multimedia](#multimedia)

Uiua can natively generate images, audio, and GIFs.

On this site, simply leaving an array on the stack that _looks_ like image or audio data will display it.

### Images

Image data can either be a rank 2 array of grayscale pixel data or a rank 3 array of grayscale with alpha, RGB, or RGBA pixel data.

This minimal example uses three different functions on x/y coordinates to generate RGB values and make a pretty gradient.

```uiua
⍉[⊞⊃⊃+-×].÷⟜⇡100
```

The Uiua logo is made with Uiua itself!

```uiua
Xy ← °⍉⊞⊟. ÷÷2: -÷2,⇡.200
Rgb ← [:°⊟×.Xy ↯△⊢Xy0.5]
u ← ↥<0.2:>0.7.+×2 ×.:°⊟Xy
c ← >⌵/ℂ Xy
⍉⊂:-¬u c1 +0.1 ↧¤c0.95Rgb
```

### Audio

Audio data is just an array of numbers between -1 and 1\. The numbers are interpreted as samples of a waveform.

This example plays a series of notes.

```uiua
↯4[0 2 4 7 12 9 7 4]
×220 ⁿ:2÷12
÷2 ∿×τ ♭⍉⊞× ÷:⇡⁅÷8. &asr
```

### GIFs

Any array whose rows can all be turned into images can be turned into a GIF.

On this site, arrays that look like they should be GIFs will be displayed as GIFs. You can see some on the [main page](/).

GIFs can be explicitly rendered with the [&gifs](/docs/&gifs) function.

## [Next Steps](#next-steps)

If you want a more in-depth introduction to Uiua, you can check out the [tutorial](/tutorial/introduction).

For information on installing the native Uiua interpreter, see the [install page](/install).

For information on specific functions and modifiers, see the [functions section](/docs#functions) of the main docs page.

To see some cool examples, click through the editor at the top of the [home page](/). There are also some interesting, longer examples in the [ main Uiua repository on GitHub](https://github.com/uiua-lang/uiua/tree/main/examples).

</page>

<page url="https://www.uiua.org/docs/&gife">

# [&gife](/docs/&gife) \- gif - encode

### Dyadic function

Encode a gif into a byte array

The first argument is a framerate in seconds.

The second argument is the gif data and must be a rank 3 or 4 numeric array.

The rows of the array are the frames of the gif, and their format must conform to that of [&ime](/docs/&ime).
  
You can decode a byte array into a gif with [° un](/docs/un)[&gife](/docs/&gife).
  
See also: [&gifs](/docs/&gifs)

</page>

<page url="https://www.uiua.org/docs/length">

# [⧻ length](/docs/length)

### Monadic function

Get the number of rows in an array

```uiua
⧻5
```

```output
1
```

```uiua
⧻[]
```

```output
0
```

```uiua
⧻1_2_3
```

```output
3
```

```uiua
⧻[1_2 3_4 5_6]
```

```output
3
```
  
[⧻ length](/docs/length) is equivalent to the [⊢ first](/docs/first) of the [△ shape](/docs/shape).

```uiua
 ⧻[1_2_3 4_5_6]
⊢△[1_2_3 4_5_6]
```

```output
2
2
```

</page>

<page url="https://www.uiua.org/docs/&ts">

# [&ts](/docs/&ts) \- terminal size

### Noadic function

Get the size of the terminal

The result is a 2-element array of the height and width of the terminal.

Height comes first so that the array can be used as a shape in [↯ reshape](/docs/reshape).

</page>

<page url="https://www.uiua.org/docs/technical">

# Technical Details

## [The Interpreter](#the-interpreter)

The Uiua interpreter is written in Rust.

Uiua code is compiled into a simple bytecode assembly. This assembly is then usually immediately executed by the interpreter.

Built-in functions are implemented in Rust so they can be as fast as possible. User-defined functions are passed around as chunks of bytecode.

## [Arrays](#arrays)

Values on the stack are implemented as Rust `enum`s, where each variant contains a different array type.

While the language itself only has 4 types, the interpreter can have 1 extra: a byte array. IO streams and some operations which have boolean results return byte arrays for space efficiency.

Array elements are stored in a reference-counted contiguous-memory container I call a _CowSlice_ or clone-on-write slice. When an array is modified, its data is only copied if it is shared with another array. In addition, pulling out the rows of an array only increments the reference count of the data, and the row arrays have modified shapes and data offsets.

Array shapes are stored in a special array type that only allocates when there are more than 3 items.

## [The Website](#website)

The Uiua website is written using the [Leptos](https://leptos.dev/) framework and hosted on GitHub pages.

Leptos compiles to webassembly, which allows the entire Uiua interpreter to be compiled and used by the site's editor.

The online editor is implemented as a `contenteditable` div with lots of custom behaviors.

</page>

<page url="https://www.uiua.org/rtl">

## [Right-to-Left](#right-to-left)

One of the most asked questions about Uiua is "Why does code execute right-to-left?" It's a valid question. Every other stack-oriented language I know goes left-to-right.

The simple answer is that while Uiua is stack-_based_, it is not stack-_oriented_.

The misunderstanding is largely my own fault. The initial version of the website said "stack-oriented" everywhere and made references to FORTH. I have since rectified this.

When you write Uiua code the stack should just be a tool, a convention. It's how you pass values around. **The stack should not guide how you think about solving problems in Uiua.**

Uiua is about composing arrays. The stack makes it possible to do this without naming local variables. This is the entire reason for its presence in the language. In particular, the stack can be used to construct arbitrary combinators and data flows. It is an extremely powerful mechanism for this purpose.

You should not think of Uiua syntax like a FORTH. You should think of it like any of the numerous other languages that put functions before their arguments. This group includes languages of vastly different kinds, like C, Haskell, and Lisp.

The left side of an expression is _not_ the end or the beginning. It is the _root_. The expression is a tree with branches that converge and diverge in different ways. It is not a list of instructions.

This allows us to separate the execution model from the mental model. With a separate mental model, why does it matter which direction the code executes? Why can't the root be on the right?

Of course, _now_ the decision is arbitrary. I'm used to languages that put the root on the left, so that is what I chose.

---

Enough with the philosophical. There are also some syntactic reasons that left-to-right execution would be weird.

Consider some mathematical expressions:

```uiua
√4
-3 5
```

```output
2
2
```

The square root looks almost just like it does in mathematical notation. It would not be so if the [√](/docs/sqrt) were to the right of the number. Similar problems arise with [¯](/docs/negate) and [¬](/docs/not).

`-3` has this nice quality where it kind of becomes its own little monadic function that also has a syntactic similarity to mathematical notation. You could do something similar if the language went the other way, with `5-`, but subtracting is a more common and intuitive operation than subtracting from.

Consider the simple [⊢ first](/docs/first) function:

```uiua
⊢[1 2 3]
```

```output
1
```

The [⊢](/docs/first) glyph was chosen because it looks like it indicates the left side of a span (imagine some longer `⊢–––––⊣`). If it had to go on the right, there is no glyph that would indicate it quite so nicely. `⊣` has a similar aesthetic when put at the end, but that would indicate the last item rather than the first.

</page>

<page url="https://www.uiua.org/docs/&ast">

# [&ast](/docs/&ast) \- audio - stream

### Monadic 0-argument modifier

Synthesize and stream audio

Expects a function that takes a list of sample times and returns a list of samples.

The samples returned from the function must either be a rank 1 array or a rank 2 array with 2 rows.

The function will be called repeatedly to generate the audio.

```uiua
Sp ← 1.5
Bass ← (
  +110×20⌊÷4◿8. # Choose note
  ±∿×π×÷Sp,     # Square wave
  ×2+1⌊◿2.:     # Modulation frequency
  ×0.2∿×π××:    # Apply modulation
)
Kick ← ∿×τ×40√√◿1
Noise ← [⍥⚂10000]
Hit ← ×↯:Noise △. ×⊓><0.5,0.6 ÷⟜◿2
Hat ← ×0.3×↯:Noise △.<0.1 ÷⟜◿0.25
&ast(÷3/+[⊃(Hat|Kick|Hit|Bass)]×Sp)
```

On the web, this will simply use the function to generate a fixed amount of audio.

How long the audio is can be configure in the editor settings.

</page>

<page url="https://www.uiua.org/docs/maximum">

# [↥ maximum](/docs/maximum)

### Dyadic pervasive function

Take the maximum of two arrays

```uiua
↥ 3 5
```

```output
5
```

```uiua
↥ [1 4 2] [3 7 1]
```

```output
[3 7 2]
```
  
Uiua does not have dedicated boolean logical operators.

[↥ maximum](/docs/maximum) can be used as a logical OR.

```uiua
↥,,≤5:≥8. [6 2 5 9 6 5 0 4]
```

```output
[0 0 0 1 0 0 0 0]
[0 1 1 0 0 1 1 1]
[0 1 1 1 0 1 1 1]
```

</page>

<page url="https://www.uiua.org/docs/quote">

# [quote](/docs/quote)

### Monadic 0-argument modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Convert a string into code at compile time

```uiua
# Experimental!
quote("+1") 5
```

```output
6
```
  
The opposite of [quote](/docs/quote) is [stringify](/docs/stringify).

</page>

<page url="https://www.uiua.org/tour">

# Uiua Language Tour

## [The Union of Two Paradigms](#the-union-of-two-paradigms)

Uiua is a programming language that incorporates two of the less-common programming paradigms: **array-oriented** and **stack-based**.

An **array-oriented** language is one where the primary data structure is the array. In array languages, many operations that can apply to a single value can also apply to every value in an array. This is known as _rank-polymorphism_.

A **stack-based** language is one where all operations manipulate a global stack of values. Functions pop values off the top of the stack, perform their calculation, then push the results back onto the stack.

In Uiua, functions work on a global stack of arrays.

That's enough introduction, let's see some code!

```uiua
+1 ×2 ⇡10
```

```output
[1 3 5 7 9 11 13 15 17 19]
```

Uiua code runs from [right to left](/tour/../rtl), top to bottom. Operators are put to the _left_ of their arguments, rather than in-between.

This program makes an array of all the numbers less than 10, multiplies each one by 2, then adds 1 to each.

If you want to see how that works step-by-step, try clicking the arrows beside the Run button.

Now, I can already hear you asking, _"Wait, what is that funny arrow? How am I supposed to type the multiplication sign?"_

Unlike some other array languages, Uiua does not require a special keyboard configuration or an editor with custom keybindings. Instead, you can type either the ASCII symbol or the name of a built-in function, then the Uiua formatter will convert it to the correct Unicode glyph.

In this case, the ASCII symbol for multiplication is `*` and the name of the funny arrow is [⇡ range](/docs/range).

On this website, you can format by clicking **Run** or by pressing **Ctrl+Enter** with the cursor in the text area. Try it out!

```uiua
+1*2 range10
```

```output
[1 3 5 7 9 11 13 15 17 19]
```

You don't even have to type the whole name of a built-in function, just enough to disambiguate it from the others.

```uiua
ran10
```

```output
[0 1 2 3 4 5 6 7 8 9]
```

If you're ever not sure what a glyph is called, you can hold ctrl/⌘ and hover over it to see its name.

You can ctrl/⌘-click any glyph in the editor to see its documentation.

Click the `↧` on the right of the editor to see a list of all the built-in functions.

## [The Stack](#the-stack)

A number in Uiua code pushes its value to the stack. On the website's editor, the values on _top_ of the stack are displayed at the _bottom_. This is so that sequential lines of code show their result in the correct order.

```uiua
10 11
@c
+1 2
"Hello, World!"
# By the way, comments start with #
```

```output
11
10
@c
3
"Hello, World!"
```

If you like, you can put values on the stack first, then operate on them.

```uiua
×++ 1 2 3 4
```

```output
24
```

[. duplicate](/docs/duplicate) duplicates the top value on the stack.

```uiua
×.3
```

```output
9
```

[. duplicate](/docs/duplicate) is often used in the examples on this site to show both the input and output of a function.

```uiua
√.225
```

```output
225
15
```

For math functions where the order matters, like [\- subtract](/docs/subtract) and [÷ divide](/docs/divide), what would normally be the second argument is instead the first. This is so you can think of fragments like [\-](/docs/subtract)`2` as a single unit.

If you want them to work the other way, you can use [: flip](/docs/flip), which swaps the top two values on the stack.

```uiua
-3 10
-:3 10
```

```output
7
¯7
```

By the way, since `-` is for [\- subtract](/docs/subtract), use `` ` `` for negative numbers. The formatter will turn in into a nice `¯`.

```uiua
`10
```

```output
¯10
```

You can inspect the stack at any point with [? stack](/docs/stack).

```uiua
+1?×2?×.-3 5
```

```output
┌╴? 1:6
├╴4
└╴╴╴╴╴╴
┌╴? 1:3
├╴8
└╴╴╴╴╴╴

9
```

## [Arrays](#arrays)

So far, we have only talked about the stack part of Uiua. Now, let's talk about the most important part: Arrays!

An array is a rectangular collection of elements arranged along some number of axes.

An array with no axes is called a scalar. All the numbers in the examples above are scalars.

An array with one axis is often called a list or a vector. An array with two axes is often called a table or a matrix.

You can make simple lists by putting `_`s between the elements.

```uiua
1_2_3_4
```

```output
[1 2 3 4]
```

You can also just surround them with `[]`s.

```uiua
[5 6 7 8]
```

```output
[5 6 7 8]
```

But wait! You can put whatever code you want between the brackets! The code runs from right to left as normal, and any values pushed to the stack get put in the array!

```uiua
[×3 . -2 . 10]
```

```output
[24 8 10]
```

If you put arrays inside others, you can make arrays with multiple dimensions.

```uiua
[1_2_3 [4 5 6] 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
```

```uiua
[×3. 4_5_6]
```

```output
╭─          
╷ 12 15 18  
   4  5  6  
           ╯
```

Some operations are _pervasive_, which means they apply to every element of an array or every pair of elements between two arrays. All the math operators are pervasive!

```uiua
√[4 9 16]
```

```output
[2 3 4]
```

```uiua
×2 [1 2 3]
```

```output
[2 4 6]
```

```uiua
+ 1_2_3 4_5_6
```

```output
[5 7 9]
```

```uiua
× 2_10 [1_2_3 4_5_6]
```

```output
╭─          
╷  2  4  6  
  40 50 60  
           ╯
```

Arrays have a [△ shape](/docs/shape) that describes how many elements they have along each axis.

```uiua
△5
△[]
△[9 1 6]
△[4_π_9 1_5_∞]
```

```output
[]
[0]
[3]
[2 3]
```

The _rank_ of an array refers to the number of axes it has.

The [⧻ length](/docs/length) is the number of rows it has along its first axis.

```uiua
a ← [1_2_3_4 5_6_7_8 9_10_11_12]
△a
⧻a
⧻△a # rank
```

```output
[3 4]
3
2
```

If you want to type that fancy `←` so you can give names to arrays, you can type `=` after a name at the start of a line, and the formatter will convert it for you.

```uiua
x = 5
+x x
```

```output
10
```

`←` just pops the first thing off the stack and assigns it to the name on the left, so if there is already a value on the stack, you don't actually need anything on the right.

```uiua
×2 [2 3 4]
x ←
x
```

```output
[4 6 8]
```

Names are case-sensitive and can only contain letters.

## [Basic Array Operations](#basic-array-operations)

You can reverse an array's rows with [⇌ reverse](/docs/reverse).

```uiua
rev[1 2 3] # Run to format!
```

```output
[3 2 1]
```

```uiua
⇌[1_2_3 4_5_6]
```

```output
╭─       
╷ 4 5 6  
  1 2 3  
        ╯
```

You can concatenate two arrays with [⊂ join](/docs/join).

```uiua
⊂1 [2 3 4]
⊂[1 2 3] [4 5 6]
```

```output
[1 2 3 4]
[1 2 3 4 5 6]
```

You can make two arrays the rows of a new array with [⊟ couple](/docs/couple).

```uiua
⊟[1 2 3] [4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

You can get the first element of an array with [⊢ first](/docs/first).

```uiua
⊢[1 2 3]
```

```output
1
```

```uiua
fir[1_2_3 4_5_6]
```

```output
[1 2 3]
```

[↙ take](/docs/take) and [↘ drop](/docs/drop) can be used to get just part of an array.

```uiua
↙3 [1 2 3 4 5]
↘3 [1 2 3 4 5]
```

```output
[1 2 3]
[4 5]
```

[↯ reshape](/docs/reshape) changes the shape of an array while keeping the elements in the same order.

```uiua
↯3_3 .⇡9
```

```output
[0 1 2 3 4 5 6 7 8]
╭─       
╷ 0 1 2  
  3 4 5  
  6 7 8  
        ╯
```

[⍉ transpose](/docs/transpose) rotates the axes of an array.

```uiua
trans.[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─     
╷ 1 4  
  2 5  
  3 6  
      ╯
```

Uiua has a lot of built-in functions like these. You can explore their documentation on the [main docs page](/docs#functions).

## [Functions](#functions)

If you bind a name with `←` and the code on the right does not have enough arguments to run, the code will be bound as a function and will not run until the name is used.

```uiua
F ← +1
F5
```

```output
6
```

```uiua
👋 ← ⊂"Hello, "
👋"World"
```

```output
"Hello, World"
```

## [Modifiers](#modifiers)

Modifiers (called operators or adverbs in some other array languages) are functions that take other functions as arguments. Modifiers are parsed so that if their function argument(s) immediately follow them, the function is run inside the modifier rather than before it.

[/ reduce](/docs/reduce) is a modifier many array-language aficionados will be familiar with. It takes its function and applies it "between" the items of an array.

One basic use of [/ reduce](/docs/reduce) is to sum an array.

```uiua
/+ [1 2 3 4 5]
```

```output
15
```

It works on multi-dimensional arrays too! In this case, it adds each row to the next, effectively summing along the columns.

```uiua
/+ .[1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
[12 15 18]
```

This works with any function. For example, you can use [↥ maximum](/docs/maximum) instead of [+ add](/docs/add) to get the maximum of each column rather than the sum.

```uiua
/↥ [1_2_3 4_5_2 3_1_8]
```

```output
[4 5 8]
```

[≡ rows](/docs/rows) applies a function to each row of an array.

```uiua
x ← [1_2_3 4_5_6]
  x
 ⇌x
≡⇌x
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─       
╷ 4 5 6  
  1 2 3  
        ╯
╭─       
╷ 3 2 1  
  6 5 4  
        ╯
```

[≡ rows](/docs/rows) also works _between_ two arrays if it is given a dyadic function like [⊂ join](/docs/join).

```uiua
≡⊂ [1_2 3_4] [5_6 7_8]
```

```output
╭─         
╷ 1 2 5 6  
  3 4 7 8  
          ╯
```

There are a bunch of other modifiers that are useful in different situations. You can find a [list of them](/docs/modifier) on the main docs page.

## [Inline Functions](#inline-functions)

If you need a more complex function for a modifier, you can make an inline function by surrounding code with `()`s.

Let's use [∵ each](/docs/each) to get the sum of all the numbers up to each element of an array.

For [∵ each](/docs/each) element, we'll [+ add](/docs/add)`1`, get the [⇡ range](/docs/range) up to that number, then [/ reduce](/docs/reduce) it with [+ add](/docs/add).

```uiua
∵(/+ ⇡ +1) .[1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
╭─          
╷  1  3  6  
  10 15 21  
  28 36 45  
           ╯
```

## [](#fill-and-nested-arrays)[⬚ fill](/docs/fill) and Nested Arrays

Here is an array that cannot be constructed normally because its rows have different [△ shape](/docs/shape)s.

```uiua
[1 2_3_4 5_6]
```

```output
Error: Cannot couple arrays with shapes [] and [3]
  at 1:1
1 | [1 2_3_4 5_6]
    ─────────────
```

One way to make this array work is to use the [⬚ fill](/docs/fill) modifier. You give it a fill value and a function or array that would fail with mismatched shapes, and it will fill in the missing values with the fill value.

```uiua
⬚0[1 2_3_4 5_6]
```

```output
╭─       
╷ 1 0 0  
  2 3 4  
  5 6 0  
        ╯
```

[⬚ fill](/docs/fill) works with lots of functions. Another one is [↙ take](/docs/take) when the amount you are taking is more than the length of the array.

```uiua
⬚π↙ 5 [1 2 3]
```

```output
[1 2 3 π π]
```
  
[⬚ fill](/docs/fill) is nice, but you don't always want to fill in the missing elements. Sometimes you need to mix values of different shapes or types in an array. To understand Uiua's solution to this problem, you must first understand its _array model_.

Uiua has what is called a _flat_ array model. Arrays must be rectangular and cannot mix types. However, the [□ box](/docs/box) function can turn any array into a _box_ element that can be put in an array with other boxes. That value can then be extracted with [° un](/docs/un)[□ box](/docs/box).

```uiua
[□1 □2_3_4 □5_6]
```

```output
{1 [2 3 4] [5 6]}
```

Having to use [□ box](/docs/box) on every value is kind of annoying, so there is a special syntax for [□ box](/docs/box) arrays that uses `{}`s instead of `[]`s.

```uiua
{1 2_3_4 5_6}
```

```output
{1 [2 3 4] [5 6]}
```

Pervasive functions work on [□ box](/docs/box)ed elements without needing to [° un](/docs/un)[□ box](/docs/box) them.

```uiua
+5 {1 2_3_4 5_6}
```

```output
{6 [7 8 9] [10 11]}
```

For more complex operations, you can use to use the [⍚ inventory](/docs/inventory) modifier, which calls a function on the content of each box.

```uiua
{"dog" "cat" "fish"}
⍚(⊂⇌.).
```

```output
{"dog" "cat" "fish"}
{"goddog" "taccat" "hsiffish"}
```

## [Multimedia](#multimedia)

Uiua can natively generate images, audio, and GIFs.

On this site, simply leaving an array on the stack that _looks_ like image or audio data will display it.

### Images

Image data can either be a rank 2 array of grayscale pixel data or a rank 3 array of grayscale with alpha, RGB, or RGBA pixel data.

This minimal example uses three different functions on x/y coordinates to generate RGB values and make a pretty gradient.

```uiua
⍉[⊞⊃⊃+-×].÷⟜⇡100
```

The Uiua logo is made with Uiua itself!

```uiua
Xy ← °⍉⊞⊟. ÷÷2: -÷2,⇡.200
Rgb ← [:°⊟×.Xy ↯△⊢Xy0.5]
u ← ↥<0.2:>0.7.+×2 ×.:°⊟Xy
c ← >⌵/ℂ Xy
⍉⊂:-¬u c1 +0.1 ↧¤c0.95Rgb
```

### Audio

Audio data is just an array of numbers between -1 and 1\. The numbers are interpreted as samples of a waveform.

This example plays a series of notes.

```uiua
↯4[0 2 4 7 12 9 7 4]
×220 ⁿ:2÷12
÷2 ∿×τ ♭⍉⊞× ÷:⇡⁅÷8. &asr
```

### GIFs

Any array whose rows can all be turned into images can be turned into a GIF.

On this site, arrays that look like they should be GIFs will be displayed as GIFs. You can see some on the [main page](/).

GIFs can be explicitly rendered with the [&gifs](/docs/&gifs) function.

## [Next Steps](#next-steps)

If you want a more in-depth introduction to Uiua, you can check out the [tutorial](/tutorial/introduction).

For information on installing the native Uiua interpreter, see the [install page](/install).

For information on specific functions and modifiers, see the [functions section](/docs#functions) of the main docs page.

To see some cool examples, click through the editor at the top of the [home page](/). There are also some interesting, longer examples in the [ main Uiua repository on GitHub](https://github.com/uiua-lang/uiua/tree/main/examples).

</page>

<page url="https://www.uiua.org/tutorial/images">

# Images and GIFs

Uiua has built-in support for generating images and GIFs.

## [Images](#images)

Creating an image is as simple as creating an array of pixel data.

To start, we can create a list of numbers from 0 to 1 by dividing a [⇡ range](/docs/range) by its length.

```uiua
÷⟜⇡10
```

```output
[0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]
```

If we make the list a bit bigger and [⊞ table](/docs/table) it with itself, we can form a square array of numbers.

Let's see what that looks like with different functions used in the [⊞ table](/docs/table).

```uiua
⊞<. ÷⟜⇡100
```

```uiua
⊞×. ÷⟜⇡100
```

```uiua
⊞◿. ÷⟜⇡100
```

We can use a bit of math(s) to make more interesting patterns. Here, we use a [⊙ dip](/docs/dip) and [∘ identity](/docs/identity) in the [⊞ table](/docs/table) to turn each list into its own image. See what happens if you remove [< less than](/docs/less than).

```uiua
< ⊞⊙∘ -1/2 : ×0.2∿×τ . ÷⟜⇡100
```

So far, these images have all been rank-2 arrays of grayscale pixel data, but rank-3 arrays allow for multiple color channels!

The last axis is always the colors. In this example, we create an array with [△ shape](/docs/shape) `[100 100 2]`. Because there are only 2 color channels, the image will be interpreted as grayscale with an alpha channel.

```uiua
⊞⊟. ÷⟜⇡100
```

With 3 or 4 color channels, you can create full-color images.

```uiua
⊞(⊂⊂.). ÷⟜⇡100 # RGB
```

```uiua
⊞(⊂.⊂). ÷⟜⇡100 # RGBA
```

In the examples above, the image array is constructed in such a way that the color channels are already the last axis. To create an image by combining color channels, it may be necessary to use [⍉ transpose](/docs/transpose).

```uiua
< ⊞⊙∘ -0.4 : ×0.2∿×τ . ÷⟜⇡100
[⍉.⇌.]
△. # Not a valid image shape
⍉:
△. # Valid image shape
```

```output
[3 100 100]
[100 100 3]
```

Of course, images need not be sqaure.

```uiua
⊞< :+1/2÷3∿×τ: ∩(÷100⇡) 100 300
```

The `Logo` constant is a quick way to get the Uiua logo as an image.

```uiua
Logo
```

The [▽ keep](/docs/keep) function can be used to scale an image vertically. [≡](/docs/rows)[▽](/docs/keep) scales it horizontally. Non-integer scales are allowed.

```uiua
▽ 0.5 Logo
```

```uiua
≡▽ 2 Logo
```

```uiua
▽⟜≡▽ 0.7 Logo
```

## [GIFs](#gifs)

To create a GIF, simply create an array where every row is an image.

Here, we define a function that takes a frame parameter and generates an image, then evaluate it for each value in a range.

```uiua
F ← <⊞×. ÷⟜⇡100 ÷2+1∿×τ
∵F÷⟜⇡30
```

## [System Functions](#system-functions)

If you use the native interpreter, arrays will not be automatically converted into images or GIFs like they are on the website. To generate them, you must explicitly call certain system functions.

You can find lists of [image](/docs/imag) and [GIF](/docs/gif) system functions on the main docs page.

One system function that is particularly useful on the website is [&gifs](/docs/&gifs), which lets you set the framerate of a GIF.

```uiua
÷2+1∿×τ÷⟜⇡30
∵(⍉[⍉..]⊞× ⟜(+∿) ÷⟜⇡80)
&gifs 30
```

</page>

<page url="https://www.uiua.org/tutorial/introduction">

# Introduction

Welcome to the Uiua tutorial! Each page of this tutorial will introduce you to a new concept in the language. The tutorial is designed to be read in order, but you can jump around if you want.

Uiua is an array programming language in the same family as APL, J, and BQN. Uiua focuses particularly on tacit programming, that is, writing code without naming variables. It does this by putting all values on a global stack.

## [What is Array Programming?](#what-is-array-programming)

Before jumping into Uiua, it may be helpful to understand the paradigm of which it is a part.

[Array Programming](https://en.wikipedia.org/wiki/Array%5Fprogramming) is a way of writing programs first developed by Ken Iverson in the 1960s. It emphasizes the use of arrays as the primary data structure, and many operations work on entire arrays at once. An array language also has a rich set of operations for manipulating arrays in various ways, to the point where many data structures and control flow constructs are replaced with operations on arrays.

## [Why Array Programming?](#why-array-programming)

There are many reasons that Array Programming is cool, but here are a few:

Perhaps the most practical reason is that arrays as a data structure are what some refer to as "machine-sympathetic". Because array elements exist in contiguous memory, they can be processed very quickly by modern CPUs. Many operations can be _vectorized_, meaning that the CPU can apply the operation to many elements in parallel. In addition, allocating memory for a large array can be done all at once. Although most array languages are dynamic and interpreted, they can often compete in performance with compiled, static languages, at least for certain kinds of tasks.

Array programming can change the way you think about programs. All operations you use act on a single, unified data structure. You stop thinking about individual items and start thinking about entire collections and how they can interact and transform.

Finally, many common algorithms are built-in to array languages, and are often written with a single glyph. This makes array code very concise and expressive. Several lines of code in a language like C or Python can often be just a few characters in an array language. Array languages do away with much of the _ceremony_ that is present in other languages, so you can focus more on the problem you are trying to solve.

## [Why Uiua?](#why-uiua)

Uiua retains many of the array operations and semantics of its predecessor array languages. However, while APL, J, and BQN structure code with syntax and semantics based on mathematical notation:

`1 + 2`, `4×ω-2`, etc.

Uiua puts values on a stack, and operators appear to the left of their arguments:

`+ 1 2`, `×4-2`, etc.

This allows Uiua to be, in most cases, even more terse than other array languages. That being said, Uiua has been designed to remain readable as much as possible, even without named local variables. While writing tacit code can quickly become unwieldy in other array languages, Uiua embraces tacitness as the only way.

Uiua also features built-in functionality for working with images, audio, and GIFs, so once you learn the language, you can very quickly get started writing programs that do interesting things!

Note that Uiua is not yet stable. While most of the core features are unlikely to change much, more complex ones are still in flux. This tutorial is based on the current state of the language, and it is updated as the language changes.

**Important Note**: This website usually uses the most recent development version of Uiua, rather than the stable release. This is so people can test new features easily. Some features available here may not be available if you install Uiua locally in the default way. The version of Uiua currently running on this site is `0.12.0-dev.2`.

## [Who is this tutorial for?](#who)

This tutorial is targeted at people who have at least a little bit of experience with programming. While you don't need to be proficient in any particular language, it will be helpful to understand concepts like variables and functions. However, even if you are a beginner, you can likely find your way through by taking the time to understand each example.

Click the link to the next section to get started!

</page>

<page url="https://www.uiua.org/docs/csv">

# [csv](/docs/csv)

### Monadic function

Encode an array into a CSV string

The input array must be at most rank-`2`.

```uiua
csv [1 2 3]
```

```output
"1\n2\n3\n"
```

```uiua
csv ↯3_4⇡12
```

```output
"0,1,2,3\n4,5,6,7\n8,9,10,11\n"
```

```uiua
csv [{"Foo" "Bar"} [1 2] [3 4] [5 6]]
```

```output
"Foo,Bar\n1,2\n3,4\n5,6\n"
```

You can use [° un](/docs/un)[csv](/docs/csv) to decode a CSV string back into an array.

```uiua
°csv "#,Count\n1,5\n2,21\n3,8\n"
```

```output
╭─             
╷ ⌜#⌟ ⌜Count⌟  
  ⌜1⌟ ⌜5⌟      
  ⌜2⌟ ⌜21⌟     
  ⌜3⌟ ⌜8⌟      
              ╯
```

The decoding result will always be a rank-`2` array of boxed strings.

You can use [∵](/docs/each)[⍣](/docs/try)[⋕](/docs/parse)[⋅](/docs/gap)[∘](/docs/identity) to convert the strings that represent numbers.

```uiua
∵⍣⋕∘ °csv "#,Count\n1,5\n2,21\n3,8\n"
```

```output
╭─             
╷ ⌜#⌟ ⌜Count⌟  
   □1      □5  
   □2     □21  
   □3      □8  
              ╯
```

If you know there are headers, you can use [° un](/docs/un)[⊂ join](/docs/join) to separate them.

```uiua
⊙⋕°⊂ °csv "#,Count\n1,5\n2,21\n3,8\n"
```

```output
╭─      
╷ 1  5  
  2 21  
  3  8  
       ╯
{"#" "Count"}
```

You can easily create a [map](/docs/map) with the headers as keys.

```uiua
map⊙(⍉⋕)°⊂ °csv "#,Count\n1,5\n2,21\n3,8\n"
```

```output
╭─                    
╷ ⌜#⌟     → [1 2 3]   
  ⌜Count⌟ → [5 21 8]  
                     ╯
```

</page>

<page url="https://www.uiua.org/docs/&sl">

# [&sl](/docs/&sl) \- sleep

### Monadic 0-output function

Sleep for n seconds

On the web, this example will hang for 1 second.

```uiua
⚂ &sl 1
```

</page>

<page url="https://www.uiua.org/blog">

# Uiua Blog

### 2024-06-02 - [Announcing Uiua 0.11.0](/blog/uiua-0.11.0)

### 2024-04-04 - [Announcing Uiua 0.10.0](/blog/uiua-0.10.0)

### 2024-01-19 - [What will Uiua 1.0 look like?](/blog/what-will-1-look-like)

### 2023-12-15 - [Why doesn't Uiua have first-class functions?](/blog/second-class-functions)

</page>

<page url="https://www.uiua.org/docs/absolute%20value">

# [⌵ absolute value](/docs/absolute value)

### Monadic pervasive function

Get the absolute value of a number

```uiua
⌵ ¯1
```

```output
1
```

```uiua
⌵ 1
```

```output
1
```

[⌵ absolute value](/docs/absolute value) converts complex numbers to their magnitude.

```uiua
⌵ ℂ3 4
```

```output
5
```
  
[⌵ absolute value](/docs/absolute value) works on characters to uppercase them.

```uiua
⌵ "Hello, World!"
```

```output
"HELLO, WORLD!"
```
  
The glyph looks like the graph of `|x|`.

</page>

<page url="https://www.uiua.org/docs/infinity">

# [∞ infinity](/docs/infinity)

### Constant

The biggest number

```uiua
∞
```

```output
∞
```

```uiua
+1 ∞
```

```output
∞
```

```uiua
-1 ∞
```

```output
∞
```

```uiua
↧5 ∞
```

```output
5
```

```uiua
↥5 ∞
```

```output
∞
```

</page>

<page url="https://www.uiua.org/docs/gen">

# [gen](/docs/gen)

### Monadic 2-output function

Generate a random number between 0 and 1 from a seed, as well as the next seed

If you don't care about a seed, you can use [⚂ random](/docs/random).
  
The same seed will always produce the same random number.

```uiua
[◌gen gen gen 0]
```

```output
[0.3221256270189806 0.7384185346305683 0.3648644966103941]
```

```uiua
[◌⍥gen3 0]
```

```output
[0.3221256270189806 0.7384185346305683 0.3648644966103941]
```

```uiua
[◌⍥gen3 1]
```

```output
[0.8446936120319615 0.1350206306549081 0.9869645195439014]
```
  
Use [× multiply](/docs/multiply) and [⌊ floor](/docs/floor) to generate a random integer in a range.

```uiua
⌊*10[◌⍥gen5 0]
```

```output
[4 9 3 7 3]
```

</page>

<page url="https://www.uiua.org/docs/rtl">

## [Right-to-Left](#right-to-left)

One of the most asked questions about Uiua is "Why does code execute right-to-left?" It's a valid question. Every other stack-oriented language I know goes left-to-right.

The simple answer is that while Uiua is stack-_based_, it is not stack-_oriented_.

The misunderstanding is largely my own fault. The initial version of the website said "stack-oriented" everywhere and made references to FORTH. I have since rectified this.

When you write Uiua code the stack should just be a tool, a convention. It's how you pass values around. **The stack should not guide how you think about solving problems in Uiua.**

Uiua is about composing arrays. The stack makes it possible to do this without naming local variables. This is the entire reason for its presence in the language. In particular, the stack can be used to construct arbitrary combinators and data flows. It is an extremely powerful mechanism for this purpose.

You should not think of Uiua syntax like a FORTH. You should think of it like any of the numerous other languages that put functions before their arguments. This group includes languages of vastly different kinds, like C, Haskell, and Lisp.

The left side of an expression is _not_ the end or the beginning. It is the _root_. The expression is a tree with branches that converge and diverge in different ways. It is not a list of instructions.

This allows us to separate the execution model from the mental model. With a separate mental model, why does it matter which direction the code executes? Why can't the root be on the right?

Of course, _now_ the decision is arbitrary. I'm used to languages that put the root on the left, so that is what I chose.

---

Enough with the philosophical. There are also some syntactic reasons that left-to-right execution would be weird.

Consider some mathematical expressions:

```uiua
√4
-3 5
```

```output
2
2
```

The square root looks almost just like it does in mathematical notation. It would not be so if the [√](/docs/sqrt) were to the right of the number. Similar problems arise with [¯](/docs/negate) and [¬](/docs/not).

`-3` has this nice quality where it kind of becomes its own little monadic function that also has a syntactic similarity to mathematical notation. You could do something similar if the language went the other way, with `5-`, but subtracting is a more common and intuitive operation than subtracting from.

Consider the simple [⊢ first](/docs/first) function:

```uiua
⊢[1 2 3]
```

```output
1
```

The [⊢](/docs/first) glyph was chosen because it looks like it indicates the left side of a span (imagine some longer `⊢–––––⊣`). If it had to go on the right, there is no glyph that would indicate it quite so nicely. `⊣` has a similar aesthetic when put at the end, but that would indicate the last item rather than the first.

</page>

<page url="https://www.uiua.org/docs/group">

# [⊕ group](/docs/group)

### Monadic 2-argument modifier

Group elements of an array into buckets by index

[⊕ group](/docs/group) is similar to `group_by` functions in other languages.

Takes a function and two arrays.

The first array must contain integers and have a shape that is a prefix of the shape of the second array.

Rows in the second array will be grouped into buckets by the indices in the first array.

Keys [<](/docs/less than)`0` will be omitted.

The function then processes each group in order. The result depends on what the function is.

If the function takes 0 or 1 arguments, then [⊕ group](/docs/group) behaves like [≡ rows](/docs/rows). This is called _iterating_ [⊕ group](/docs/group).

```uiua
⊕∘ [0 2 2 1 0 1] [1 2 3 4 5 6]
```

```output
╭─     
╷ 1 5  
  4 6  
  2 3  
      ╯
```

If the function takes 2 or more arguments, then [⊕ group](/docs/group) behaves like [/ reduce](/docs/reduce). This is called _reducing_ [⊕ group](/docs/group).

```uiua
⊕⊂ [0 2 2 1 0 1] [1 2 3 4 5 6]
```

```output
[1 5 4 6 2 3]
```

If the values returned by the function do not have the same [△ shape](/docs/shape), concatenation will fail.

```uiua
⊕∘ [0 1 0 2 1 1] [1 2 3 4 5 6]
```

```output
Error: Cannot couple arrays with shapes [2] and [3]
  at 1:1
1 | ⊕∘ [0 1 0 2 1 1] [1 2 3 4 5 6]
    ─
```

It is common to use [□ box](/docs/box) to encapsulate groups of different [△ shape](/docs/shape)s.

```uiua
⊕□ [0 1 0 2 1 1] [1 2 3 4 5 6]
```

```output
{[1 3] [2 5 6] [4]}
```
  
When combined with [⊛ classify](/docs/classify), you can do things like counting the number of occurrences of each character in a string.

```uiua
$ Count the characters in this string
⊟∩≡□ ⊕⊃⊢⧻ ⊛.
```

```output
╭─                                           
╷ ⌞C ⌞o ⌞u ⌞n ⌞t ⌞  ⌞h ⌞e ⌞c ⌞a ⌞r ⌞s ⌞i ⌞g  
  □1 □1 □1 □3 □5 □5 □3 □2 □2 □2 □3 □3 □3 □1  
                                            ╯
```
  
The indices may be multidimensional.

```uiua
⊕□ [0_2 2_1] ["ab" "cd"]
```

```output
{"a" "d" "bc"}
```
  
[⍜ under](/docs/under)[⊕ group](/docs/group) works if [⊕ group](/docs/group)'s function is [⍜ under](/docs/under)able.

```uiua
⍜⊕□≡⇌ ≠@ . $ These are some words
```

```output
"sdrow emo sera esehT"
```

The length of each group must not change.

```uiua
⍜⊕□⇌ ≠@ . $ These are some words
```

```output
Error: A group's length was modified between grouping and ungrouping
  at 1:2
1 | ⍜⊕□⇌ ≠@ . $ These are some words
     ─
```
  
[⊕ group](/docs/group) is closely related to [⊜ partition](/docs/partition).

</page>

<page url="https://www.uiua.org/docs/greater%20or%20equal">

# [≥ greater or equal](/docs/greater or equal)

### Dyadic pervasive function

Compare for greater than or equal

Formats from `>=`.
  
The second value is checked to be greater than or equal to the first.

This is so you can think of `≥` `x` as a single unit.

```uiua
≥1 2
```

```output
1
```

```uiua
≥5 5
```

```output
1
```

```uiua
≥7 3
```

```output
0
```

```uiua
≥2 [1 2 3]
```

```output
[0 1 1]
```

```uiua
≥ [1 2 2] [1 2 3]
```

```output
[1 1 1]
```

</page>

<page url="https://www.uiua.org/docs/&ffi">

# [&ffi](/docs/&ffi) \- foreign function interface

### Dyadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Call a foreign function interface

_Warning ⚠️: Using FFI is deeply unsafe. Calling a function incorrectly is undefined behavior._
  
The first argument is a list of boxed strings specifying the source and signature of the foreign function.

The second argument is a list of values to pass to the foreign function.
  
The first argument must be of the form `{"lib_path" "return_type" "function_name" "arg1_type" "arg2_type" …}`.

The lib path is the path to the shared library or DLL that contains the function.

Type names roughly match C types. The available primitive types are:

\- `void`

\- `char`

\- `short`

\- `int`

\- `long`

\- `long long`

\- `float`

\- `double`

\- `unsigned char`

\- `unsigned short`

\- `unsigned int`

\- `unsigned long`

\- `unsigned long long`

Suffixing any of these with `*` makes them a pointer type.

Struct types are defined as a list of types between `{}`s separated by `;`s, i.e. `{int; float}`. A trailing `;` is optional.
  
Arguments are passed as a list of boxed values.

If we have a C function `int add(int a, int b)` in a shared library `example.dll`, we can call it like this:

```uiua
# Experimental!
Lib ← &ffi ⊂□"example.dll"
Add ← Lib {"int" "add" "int" "int"}
Add {2 3} # 5
```
  
Uiua arrays can be passed to foreign functions as pointer-length pairs.

To do this, specify the type of the list items followed by `:n`, where `n` is the index of the parameter that corresponds to the length.

The interpreter will automatically pass the number of elements in the array to this parameter.

Arrays passed in this way will be implicitely [♭ deshape](/docs/deshape)ed, unless the item type is a struct.

If we wave a C function `int sum(const int* arr, int len)` in a shared library `example.dll`, we can call it like this:

```uiua
# Experimental!
Lib ← &ffi ⊂□"example.dll"
Sum ← Lib {"int" "sum" "const int:1" "int"}
Sum {[1 2 3 4 5]} # 15
```
  
[&ffi](/docs/&ffi) calls can return multiple values.

In addition to the return value, any non-`const` pointer parameters will be interpreted as out-parameters.

If there is more than one output value (including the return value), [&ffi](/docs/&ffi) will return a list of the boxed output values.

If we have a C function `int split_head(int* list, int* len)` in a shared library `example.dll`, we can call it like this:

```uiua
# Experimental!
Lib ← &ffi ⊂□"example.dll"
SplitHead ← Lib {"int" "split_head" "int:1" "int*"}
SplitHead {[1 2 3 4 5]} # {1 [2 3 4 5]}
```

Note that the length parameter is a non-`const` pointer. This is because the function will modify it.
  
`const char*` parameters and return types are interpreted as null-terminated strings, without an associated length parameter.
  
Structs can be passed either as lists of boxed values or, if all fields are of the same type, as a normal array.

If all fields of a struct returned by a foreign function are of the same type, the interpreter will automatically interpret it as an array rather than a list of boxed values.

If we have a C struct `struct Vec2 { float x; float y; }` and a function `Vec2 vec2_add(Vec2 a, Vec2 b)` in a shared library `example.dll`, we can call it like this:

```uiua
# Experimental!
Lib ← &ffi ⊂□"example.dll"
VecII ← "{float; float}"
Add ← Lib {VecII "vec2_add" VecII VecII}
Add {[1 2] [3 4]} # [4 6]
```
  
If a foreign function returns or has an out-parameter that is a pointer type, a special array is returned representing the pointer. This array is not useful as a normal array, but it can be passed back as an [&ffi](/docs/&ffi) argument, read from with [&memcpy](/docs/&memcpy), or freed with [&memfree](/docs/&memfree).
  
Coverage of types that are supported for binding is currently best-effort.

If you encounter a type that you need support for, please [open an issue](https://github.com/uiua-lang/uiua/issues/new).

</page>

<page url="https://www.uiua.org/docs/recv">

# [recv](/docs/recv)

### Monadic function

Receive a value from a thread

Expects a thread id returned by [spawn](/docs/spawn) or [pool](/docs/pool).

The thread id `0` corresponds to the parent thread.

The sending thread can send a value with [send](/docs/send).
  
Unlike [tryrecv](/docs/tryrecv), [recv](/docs/recv) blocks until a value is received.

</page>

<page url="https://www.uiua.org/docs/negate">

# [¯ negate](/docs/negate)

### Monadic pervasive function

Negate a number

Formats from `` ` ``.
  
```uiua
¯ 1
```

```output
¯1
```

```uiua
¯ ¯3
```

```output
3
```

```uiua
¯ [1 2 ¯3]
```

```output
[¯1 ¯2 3]
```

```uiua
¯ ℂ3 5
```

```output
¯5-3i
```
  
[¯ negate](/docs/negate) also works on characters to toggle their case.

```uiua
¯ "Hello, World!"
```

```output
"hELLO, wORLD!"
```

Use this with [⌵ absolute value](/docs/absolute value) to lowercase a string.

```uiua
¯⌵ "Hello, World!"
```

```output
"hello, world!"
```

</page>

<page url="https://www.uiua.org/docs/xlsx">

# [xlsx](/docs/xlsx)

### Monadic function

Encode an array into XLSX bytes

XLSX is a spreadsheet format that can be edited in programs like Microsoft Excel, Google Sheets, and LibreOffice Calc.

Spreadsheets are just arrays, so array languages like Uiua are a natural fit for working with them.
  
The input value must be a sheet array or a [map](/docs/map) array with sheet names as keys and sheet arrays as values.

Sheet arrays may be at most rank `2`.

XLSX is a binary format, so the output is a byte array.
  
You can use [° un](/docs/un)[xlsx](/docs/xlsx) to decode an XLSX byte array back into a sheet map.

In the resulting sheet map, each sheet will be a boxed rank-`2` array of boxed values.
  
While it is not useful to display the output bytes here, we can see how the result of decoding works:

```uiua
°xlsx xlsx . ↯3_6⇡18
```

```output
╭─                   
╷  0  1  2  3  4  5  
   6  7  8  9 10 11  
  12 13 14 15 16 17  
                    ╯
╭─                                        
             ╓─                           
             ╟  □0  □1  □2  □3  □4  □5    
  ⌜Sheet1⌟ →    □6  □7  □8  □9 □10 □11    
               □12 □13 □14 □15 □16 □17    
                                       ╜  
                                         ╯
```

</page>

<page url="https://www.uiua.org/docs/&asr">

# [&asr](/docs/&asr) \- audio - sample rate

### Noadic function

Get the sample rate of the audio output backend

```uiua
&asr
```

```output
44100
```

Here is how you can generate a list of sample times for `4` seconds of audio:

```uiua
÷:⇡×, 4 &asr
```

Pass that to a periodic function, and you get a nice tone!

```uiua
÷4∿×τ×220 ÷:⇡×, 4 &asr
```

</page>

<page url="https://www.uiua.org/docs/pop">

# [◌ pop](/docs/pop)

### Monadic 0-output function

Discard the top stack value

```uiua
[◌ 1 2 ◌ 3 4]
```

```output
[2 4]
```

This is usually used to discard values that are no longer needed.

For example, [gen](/docs/gen) returns both a random number and a seed for the next call.

When you have all the random numbers you need, you often want to discard the seed.

```uiua
⌊×10[◌⍥gen10 0]
```

```output
[2 1 7 3 9 4 9 3 7 3]
```
  
[° un](/docs/un)[◌ pop](/docs/pop) can be used to retrieve the [⬚ fill](/docs/fill) value.

```uiua
⬚3(+°◌°◌)
```

```output
6
```

</page>

<page url="https://www.uiua.org/docs/deal">

# [deal](/docs/deal)

### Dyadic function

Randomly reorder the rows of an array with a seed

```uiua
deal0 [1 2 3 4 5]
```

```output
Warning: deal is deprecated and will be removed in a future version, use ⊏⍏⊸≡⋅⚂ instead
  at 1:1
1 | deal0 [1 2 3 4 5]
    ────

[1 5 4 2 3]

```

```uiua
deal5 [1_2 3_4 5_6 7_8]
```

```output
Warning: deal is deprecated and will be removed in a future version, use ⊏⍏⊸≡⋅⚂ instead
  at 1:1
1 | deal5 [1_2 3_4 5_6 7_8]
    ────

╭─     
╷ 3 4  
  7 8  
  5 6  
  1 2  
      ╯

```

If you don't care about a seed, just seed with [⚂ random](/docs/random).

```uiua
deal⚂ [1 2 3 4 5]
```

```output
Warning: deal is deprecated and will be removed in a future version, use ⊏⍏⊸≡⋅⚂ instead
  at 1:1
1 | deal⚂ [1 2 3 4 5]
    ────

[2 1 5 3 4]

```

```uiua
deal⚂ [1_2 3_4 5_6 7_8]
```

```output
Warning: deal is deprecated and will be removed in a future version, use ⊏⍏⊸≡⋅⚂ instead
  at 1:1
1 | deal⚂ [1_2 3_4 5_6 7_8]
    ────

╭─     
╷ 3 4  
  7 8  
  5 6  
  1 2  
      ╯

```

</page>

<page url="https://www.uiua.org/docs/divide">

# [÷ divide](/docs/divide)

### Dyadic pervasive function

Divide values

Formats from `%`.
  
The second value is divided by the first.

This is so you can think of `÷` `x` as a single unit.

```uiua
÷3 12
```

```output
4
```

```uiua
÷2 [1 2 3]
```

```output
[0.5 1 1.5]
```

```uiua
÷ [1 2 3] [4 5 6]
```

```output
[4 2.5 2]
```

```uiua
÷ [¯1 0 1] "hey"
```

```output
"Hey"
```

</page>

<page url="https://www.uiua.org/docs/unique">

# [◰ unique](/docs/unique)

### Monadic function

Get a mask of first occurrences of items in an array

```uiua
◰ 7_7_8_0_1_2_0
```

```output
[1 0 1 1 1 1 0]
```

```uiua
◰ "Hello, World!"
```

```output
[1 1 1 0 1 1 1 1 0 1 0 1 1]
```

```uiua
◰ [3_2 1_4 3_2 5_6 1_4 7_8]
```

```output
[1 1 0 1 0 1]
```

[▽ keep](/docs/keep)[◰ unique](/docs/unique)[. duplicate](/docs/duplicate) is equivalent to [◴ deduplicate](/docs/deduplicate).

```uiua
▽◰. 7_7_8_0_1_2_0
```

```output
Advice: Prefer ◴ deduplicate over ▽◰.
  at 1:1
1 | ▽◰. 7_7_8_0_1_2_0
    ───

[7 8 0 1 2]

```

[◰ unique](/docs/unique) is mainly useful for deduplicating by a certain property.

Here, we deduplicate by the [⌵ absolute value](/docs/absolute value) of the elements.

```uiua
▽◰⌵. [1 ¯2 ¯5 2 3 1 5]
```

```output
[1 ¯2 ¯5 3]
```

</page>

<page url="https://www.uiua.org/docs/content">

# [◇ content](/docs/content)

### Monadic modifier

Unbox the arguments to a function before calling it

```uiua
 ⊂ □[1 2 3] □[4 5 6]
◇⊂ □[1 2 3] □[4 5 6]
```

```output
{[1 2 3] [4 5 6]}
[1 2 3 4 5 6]
```

A common use of [◇ content](/docs/content) is to collapse a list of [□ box](/docs/box)ed arrays with [/ reduce](/docs/reduce).

```uiua
/◇⊂ {1_2_3 4_5 6}
```

```output
[1 2 3 4 5 6]
```

This case will still unbox a single element.

```uiua
/◇⊂ {"Hi"}
```

```output
"Hi"
```

</page>

<page url="https://www.uiua.org/tutorial/audio">

# Audio Output

Uiua has a built-in support for audio output.

## [Basic Synthesis](#basic-synthesis)

In the online editor, you need only make an array that looks like audio samples.

Audio samples must be either a rank 1 where each element is a sample or a rank 2 array where each row is a channel.

The samples must be between `-1` and `1`. We use the [&asr](/docs/&asr) system function to get the sample rate of the audio output.

For a minimal example, here is a simple 1 second sawtooth wave:

```uiua
÷2 ◿1×220 ÷⟜⇡&asr
```

First, we make a range of numbers from 0 to 1 by getting the [⇡ range](/docs/range) up to the sample rate and dividing it by that much. This array represents the time at each sample.

Then, we multiply the time by 220, the frequency of an A3 note, and take the [◿ modulus](/docs/modulus)1 of that. This gives us a nice pure sawtooth wave.

Finally, the wave is a little loud on its own, so we [÷ divide](/docs/divide) it by 2.
  
For longer time arrays, [× multiply](/docs/multiply) the number of samples by the number of seconds you want before calling [⇡ range](/docs/range) but after [. duplicate](/docs/duplicate).

```uiua
÷2◿1×220÷:⇡ ×3 .&asr
```

If you [× multiply](/docs/multiply) by a non-integer, you may need to use [⁅ round](/docs/round) to prevent an error.

```uiua
÷2◿1×220÷:⇡ ⁅×0.5 .&asr
```

## [Notes](#notes)

My favorite way to make multiple notes is to [⊞ table](/docs/table) different frequencies with the time array.

Then, if you want a chord, you can use [/](/docs/reduce)[+](/docs/add) to add them together.

If you want sequence instead, you can use [/](/docs/reduce)[⊂](/docs/join).

You can calculate freqencies `f` that are a certain number of half-steps `n` from another with the formula `f×2^(n/12)` which can be written in Uiua as`[×](/docs/multiply)f[ⁿ](/docs/power)[:](/docs/flip)2[÷](/docs/divide)12 n`.

In this example, we make both a chord and a sequence from the same notes. We use [∿](/docs/sine)[×](/docs/multiply)[τ](/docs/tau) to make a sine wave instead of a saw wave.

```uiua
f ← ×220ⁿ:2÷12 [0 4 7]
s ← ∿×τ⊞×f ÷⟜⇡&asr
÷⧻f/+s
÷⧻f/⊂s
```

## [Native Audio](#native-audio)

If running code in the native Uiua interpreter, arrays will not be automatically turned into audio.

Instead, you must use the [&ap](/docs/&ap) system function to play it.

[&ap](/docs/&ap) should work fine on the website as well, but it is not necessary.

```uiua
&ap÷2×¬◿1×4:±∿×τ×55.÷:⇡×2. &asr
```

</page>

<page url="https://www.uiua.org/docs/table">

# [⊞ table](/docs/table)

### Monadic modifier

Apply a function to each combination of rows of two arrays

This is often what you want instead of [∵ each](/docs/each).
  
```uiua
⊞+ 1_2_3 4_5_6_7
```

```output
╭─          
╷ 5 6 7  8  
  6 7 8  9  
  7 8 9 10  
           ╯
```

```uiua
⊞⊂ 1_2 3_4
```

```output
╭─     
╷ 1 3  
╷ 1 4  
       
  2 3  
  2 4  
      ╯
```
  
The resulting array will always have a shape starting with the lengths of the two inputs.

```uiua
△⊞+ 1_2 3_4_5
```

```output
[2 3]
```

```uiua
△⊞⊂ 1_2 3_4_5
```

```output
[2 3 2]
```

```uiua
△⊞+ [1_2_3 4_5_6] [7 8 9 10]
```

```output
[2 4 3]
```

```uiua
△⊞⊂ [1_2_3 4_5_6] [7 8 9 10]
```

```output
[2 4 4]
```
  
[⊞ table](/docs/table) also works with more than two arrays.

```uiua
⊞(⊂⊂) 1_2 3_4 5_6
```

```output
╭─       
╷ 1 3 5  
╷ 1 3 6  
╷        
  1 4 5  
  1 4 6  
         
  2 3 5  
  2 3 6  
         
  2 4 5  
  2 4 6  
        ╯
```

If you want to fix one of the arrays so that it is present in every call of the function, you can simply add a dimension to it, though you may need to collapse it later.

Here, we add a dimension to the second array to [¤ fix](/docs/fix) it, then collapse with [/](/docs/reduce)[⊂](/docs/join).

```uiua
/⊂ ⊞(⊂⊂) ⊙¤ 1_2 3_4 5_6
```

```output
╭─         
╷ 1 3 4 5  
╷ 1 3 4 6  
           
  2 3 4 5  
  2 3 4 6  
          ╯
```

</page>

<page url="https://www.uiua.org/docs/&fld">

# [&fld](/docs/&fld) \- file - list directory

### Monadic function

List the contents of a directory

The result is a list of boxed strings.

```uiua
&fld "."
```

```output
{"example.ua" "example.txt"}
```

</page>

<page url="https://www.uiua.org/docs/experimental">

# Experimental Features

Uiua has a number of features that are considered experimental. They are available in the interpreter for testing, but may be removed or changed in the future.

Using experimental features requires an `# Experimental!` comment to be placed at the top of a Uiua source file.

## Experimental Functions and Modifiers

* [⮌ orient](/docs/orient)
* [chunks](/docs/chunks)
* [◹ triangle](/docs/triangle)
* [⤙ but](/docs/but)
* [⤚ with](/docs/with)
* [◠ above](/docs/above)
* [◡ below](/docs/below)
* [¨ backward](/docs/backward)
* [case](/docs/case)
* [stringify](/docs/stringify)
* [quote](/docs/quote)
* [signature](/docs/signature)
* [fft](/docs/fft)
* [astar](/docs/astar)
* [&tlsl](/docs/&tlsl)
* [&ffi](/docs/&ffi)
* [&memcpy](/docs/&memcpy)
* [&memfree](/docs/&memfree)

</page>

<page url="https://www.uiua.org/docs/now">

# [now](/docs/now)

### Noadic function

Get the current time in seconds

Time is expressed in seconds since the Unix epoch.

```uiua
now
```

```output
1721479172.5209
```

[⍜ under](/docs/under)[now](/docs/now) can be used to time a function.

```uiua
⍜now(5&sl1)
```

</page>

<page url="https://www.uiua.org/docs/round">

# [⁅ round](/docs/round)

### Monadic pervasive function

Round to the nearest integer

```uiua
⁅1.2
```

```output
1
```

```uiua
⁅¯1.2
```

```output
¯1
```

```uiua
⁅1.5
```

```output
2
```

```uiua
⁅[0.1 π 2 9.9 7.5]
```

```output
[0 3 2 10 8]
```

</page>

<page url="https://www.uiua.org/docs/remove">

# [remove](/docs/remove)

### Dyadic function

Remove the value corresponding to a key from a map array

See [map](/docs/map) for an overview of map arrays.
  
The key is removed if it is present.

If the key is not present, the array is unchanged.

```uiua
map 1_2 3_4
remove 2 .
remove 5 .
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
[1 → 3]
[1 → 3]
```
  
Unlike the other map functions, [remove](/docs/remove) has O(n) time complexity.
  
See also: [insert](/docs/insert), [has](/docs/has), [get](/docs/get)

</page>

<page url="https://www.uiua.org/tutorial/functions">

# Modifiers and Functions

## [Modifiers](#modifiers)

Modifiers are functions that take other functions as arguments. If you immediately follow a modifier with its function arguments, the functions will be called inside the modifier rather than outside.

For example, [/ reduce](/docs/reduce) applies a function "between" all rows of an array.

[/](/docs/reduce)[+](/docs/add) is therefore the sum of all the rows of an array.

```uiua
/+ 1_2_3_4
```

```output
10
```

[\\ scan](/docs/scan) is similar, but it returns all the intermediate results.

```uiua
\+ 1_2_3_4
```

```output
[1 3 6 10]
```

[≡ rows](/docs/rows) applies a function to each row of an array.

For example, [/](/docs/reduce)[+](/docs/add) adds each row of a matrix to the next, effectively summing along the columns.

[≡](/docs/rows)[/](/docs/reduce)[+](/docs/add) sums each row itself.

```uiua
    [1_2_3 4_5_6 7_8_9]
 /+ [1_2_3 4_5_6 7_8_9]
≡/+ [1_2_3 4_5_6 7_8_9]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
  7 8 9  
        ╯
[12 15 18]
[6 15 24]
```

[⊞ table](/docs/table) applies a function between all combinations of rows of two arrays. This is sometimes called the _outer product_.

```uiua
⊞+ [5 6 7 8] [10 20 30 40]
```

```output
╭─             
╷ 15 25 35 45  
  16 26 36 46  
  17 27 37 47  
  18 28 38 48  
              ╯
```

In the same way that "monadic" and "dyadic" functions refer to functions that take one or two array arguments respectively, "monadic" and "dyadic" _modifiers_ refer to modifiers that take one or two _functions_ respectively.

On this site, monadic modifiers are in yellow and dyadic modifiers are in purple.

The main docs page has [a list](/docs/modifier) of all of the built-in modifiers.

## [Inline Functions](#inline-functions)

In addition to creating a new function with a capitalized binding name, as discussed in the [previous section](/tutorial/bindings), functions in Uiua can also be created by surrounding code with `()`s.

This is usually only necessary when you need to call multiple functions within a modifier.

For example, if you wanted to get the last element of each row of an array, you could use [≡ rows](/docs/rows).

```uiua
≡(⊢⇌) .[2_5_3 0_2_1 0_0_2]
```

```output
╭─       
╷ 2 5 3  
  0 2 1  
  0 0 2  
        ╯
[3 1 2]
```

Inline functions may span multiple lines. Unlike multiline stack notation arrays, which run bottom-to-top, multiline inline functions run top-to-bottom as other code does.

```uiua
X ← (
  ⊞=.⇡ # First this line runs
  ↥⇌.  # Then this one
)
X 5
```

```output
╭─           
╷ 1 0 0 0 1  
  0 1 0 1 0  
  0 0 1 0 0  
  0 1 0 1 0  
  1 0 0 0 1  
            ╯
```

Output comments inside inline functions will show the values on the stack for each time the function is called. Try it out!

```uiua
F ← (
  ### Run to see values here!
  +×.
  ##
)
F 3 5
F 2 9
F 10 11
```

```output
14
13
111
```

## [A Note on Local Bindings](#local-bindings)

Bindings in Uiua can _only_ be global. There is no way to give a name to a value within an inline function. A `←` inside `()`s is a syntax error.

This is a deliberate design decision. It forces you to write tacit code, a.k.a. code with functions that do not mention their arguments. Uiua is designed to make writing tacit code as workable as possible. _How_ it does this will be discussed in [later](/tutorial/advancedstack) [sections](/tutorial/advancedarray).

## [Format Strings](#format-strings)

Prefixing a string with a `$` creates a format string. A format string is a special kind of function. It takes an argument for each `_` in the string and replaces it with the stringified version.

```uiua
"World"
$"Hello, _!"
```

```output
"Hello, World!"
```

```uiua
Greet ← $"Hello, _!"
Greet "user"
```

```output
"Hello, user!"
```

```uiua
x ← 5
$"x = _" x
```

```output
"x = 5"
```

```uiua
$"_, _, and _" 1 2 3
```

```output
"1, 2, and 3"
```

If you need to use a literal `_`, you can escape them with `\`.

```uiua
$"\__\_" 27
```

```output
"_27_"
```

Raw strings can be made format strings by adding an additional `$`.

```uiua
+,, 1 2
&p $$ What are two numbers that add up to _?
   $$ _ and _ do!
```

```output
What are two numbers that add up to 3?
1 and 2 do!

```

`_`s still need to be escaped in raw format strings.

```uiua
1 2 3
$$ _\__\__
```

```output
"1_2_3"
```

Because format strings are just functions, you can use them with modifiers like [/ reduce](/docs/reduce). This is a common way to join a list of [□ box](/docs/box)ed strings.

```uiua
/$"_ _" {"Separated" "by" "spaces"}
```

```output
"Separated by spaces"
```

## [Stack Signatures](#stack-signatures)

Bindings and inline functions can have a _stack signature_ declared with a `|` followed by 1 or 2 numbers separated by a `.`. The first number is the number of arguments the function pops from the stack. The second number is the number of values the function pushes to the stack.

The second number is optional. If it is not given, it is assumed to be 1.

In bindings, the `|` comes after the `←`. In inline functions, it comes after the `(`.

```uiua
TimesThree ← |1.1 ×3
TimesThree 7
```

```output
21
```

```uiua
TimesThree ← |1   ×3
TimesThree 7
```

```output
21
```

```uiua
∵(|2.1 ⊟.×) 1_2_3 4_5_6
```

```output
╭─       
╷  4  4  
  10 10  
  18 18  
        ╯
```

Stack signatures are useful for documenting functions to make sure that they are used correctly.

A signature declaration is _required_ if the function's signature cannot be inferred. The compiler can usually infer a function's signature unless you are doing something weird that it cannot reason about.

In addition, an error is thrown if a function's signature can be inferred and the inferred signature does not match the declared signature. This can help validate that a function is correct.

```uiua
≡(|2 ↻.) 1_2_3 ↯3_3⇡9
```

```output
Error: Function signature mismatch: declared |2 but inferred |1
  at 1:3
1 | ≡(|2 ↻.) 1_2_3 ↯3_3⇡9
      ───
```

If the compiler cannot derive the stack signature of a function and you give it one which is _wrong_, the function will throw an error at runtime.

## [Proxy Values](#proxy)

Because Uiua is a dynamically typed language, the types and shapes of values returned by functions are not known until runtime. This creates a problem when iterating over arrays. What if the array is empty? The function will never be run, so the proper type and shape of the result cannot be determined. Uiua has a way to get around this [problem](https://mlochbaum.github.io/BQN/commentary/problems.html#empty-arrays-lose-type-information) that some other array languages have.

Some iterating modifiers use what are called _proxy values_ if the iterated array is empty. The modifier's function is called on these values if the array is empty. This ensures that the result has the correct shape and type, even if the function is never run on the actual values.

The following example would produce inconsistent results if the proxy value was not used.

```uiua
△≡⇌↯3_4⇡12
△≡⇌↯0_4⇡12 # Would be [0] without proxy
```

```output
[3 4]
[0 4]
```

There are some ways to make the proxy value visible.

```uiua
≡(&p.) []
```

```output
[]
```

To avoid this case, you can conditionally iterate. This example uses a [⍥ repeat](/docs/repeat) modifier to conditionally call the function.

```uiua
⍥≡(&p.)±⧻. []
```

```output
[]
```

</page>

<page url="https://www.uiua.org/docs/&gifs">

# [&gifs](/docs/&gifs) \- gif - show

### Dyadic 0-output function

Show a gif

The first argument is a framerate in seconds.

The second argument is the gif data and must be a rank 3 or 4 numeric array.

The rows of the array are the frames of the gif, and their format must conform to that of [&ime](/docs/&ime).
  
See also: [&gife](/docs/&gife)

</page>

<page url="https://www.uiua.org/docs/shape">

# [△ shape](/docs/shape)

### Monadic function

Get the dimensions of an array

```uiua
△5
```

```output
[]
```

```uiua
△[]
```

```output
[0]
```

```uiua
△1_2_3
```

```output
[3]
```

```uiua
△[1_2 3_4 5_6]
```

```output
[3 2]
```
  
[° un](/docs/un)[△ shape](/docs/shape) creates an array of incrementing elements with the given shape.

```uiua
°△ 2_3_4
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
```
  
It is a triangle`△` because a triangle is a shape.

</page>

<page url="https://www.uiua.org/docs/equals">

# [\= equals](/docs/equals)

### Dyadic pervasive function

Compare for equality

```uiua
=1 2
```

```output
0
```

```uiua
=5 5
```

```output
1
```

```uiua
=1 [1 2 3]
```

```output
[1 0 0]
```

```uiua
= [1 2 2] [1 2 3]
```

```output
[1 1 0]
```

</page>

<page url="https://www.uiua.org/docs/logarithm">

# [ₙ logarithm](/docs/logarithm)

### Dyadic pervasive function

Get the based logarithm of a number

The first value is the base, and the second value is the power.

```uiua
ₙ2 8
```

```output
3
```

```uiua
ₙ2 [8 16 32]
```

```output
[3 4 5]
```

```uiua
ₙ [2 3 4] [16 27 1024]
```

```output
[4 3.00…04 5]
```

</page>

<page url="https://www.uiua.org/docs/insert">

# [insert](/docs/insert)

### Triadic function

Insert a key-value pair into a map array

See [map](/docs/map) for an overview of map arrays.
  
The array is used as an actual hashmap, so some entries may be empty.

```uiua
[]
insert 1 2
insert 3 4
insert 5 6
```

```output
╭─       
  1 → 2  
  3 → 4  
  5 → 6  
        ╯
```

If the key is already present, it is replaced.

```uiua
[]
insert 1 2
insert 3 4
insert 3 5
```

```output
╭─       
  1 → 2  
  3 → 5  
        ╯
```

Keys that are already present keep their order.

```uiua
map 1_2_3 4_5_6
insert 1 10
```

```output
╭─        
  1 → 10  
  2 →  5  
  3 →  6  
         ╯
```

Here is a pattern for [remove](/docs/remove)ing a key if it is present before [insert](/docs/insert)ing it, so that the key moves to the end.

```uiua
map 1_2_3 4_5_6
insert⟜⍜⊙◌remove 1 10
```

```output
╭─        
  2 →  5  
  3 →  6  
  1 → 10  
         ╯
```

All keys (and all values) must have the same shape and type.

```uiua
map 1 ["wow"]
insert "hi" "there"
```

```output
Error: Cannot insert character key into map with number keys
  at 2:1
2 | insert "hi" "there"
    ──────
```

[□ box](/docs/box) keys or values if you need to. Values will coerce to boxes if necessary.

```uiua
map 1 ["wow"]
insert □"hi" □"there"
```

```output
╭─                
    □1 → ⌜wow⌟    
  ⌜hi⌟ → ⌜there⌟  
                 ╯
```

```uiua
map □1 □"wow"
insert "hi" "there"
```

```output
╭─                
    □1 → ⌜wow⌟    
  ⌜hi⌟ → ⌜there⌟  
                 ╯
```
  
See also: [has](/docs/has), [get](/docs/get), [remove](/docs/remove)

</page>

<page url="https://www.uiua.org/docs/&frab">

# [&frab](/docs/&frab) \- file - read all to bytes

### Monadic function

Read all the contents of a file into a byte array

Expects a path and returns a rank-`1` numeric array.
  
```uiua
&frab "example.txt"
```

```output
[84 104 105 115 32 105 115 32 97 32 115 105 109 112 108 101 32 116 101 120 116 32 102 105 108 101 32 102 111 114 32 10 117 115 101 32 105 110 32 101 120 97 109 112 108 101 32 85 105 117 97 32 99 111 100 101 32 226 156 168]
```

You can use [⍜ under](/docs/under)[&frab](/docs/&frab) to write back to the file after modifying the array.

```uiua
⍜&frab(⊂:-@\0"\n# Wow!") "example.txt"
&p&fras "example.txt"
```

```output
This is a simple text file for 
use in example Uiua code ✨
# Wow!

```
  
See [&fras](/docs/&fras) for reading into a rank-`1` character array.

</page>

<page url="https://www.uiua.org/docs/assert">

# [⍤ assert](/docs/assert)

### Dyadic 0-output function

Throw an error if a condition is not met

Expects a message and a test value.

If the test value is anything but `1`, then the message will be thrown as an error.
  
```uiua
⍤"Oh no!" "any array"
```

```output
Error: Oh no!
  at 1:1
1 | ⍤"Oh no!" "any array"
    ─
```

```uiua
⍤"Oh no!" 1
```

```uiua
⍤"Oh no!" 0
```

```output
Error: Oh no!
  at 1:1
1 | ⍤"Oh no!" 0
    ─
```
  
Use [. duplicate](/docs/duplicate) if you do not care about the message.

```uiua
⍤. =6 6
```

```uiua
⍤. =8 9
```

```output
Error: 0
  at 1:1
1 | ⍤. =8 9
    ─
```
  
Errors thrown by [⍤ assert](/docs/assert) can be caught with [⍣ try](/docs/try).

</page>

<page url="https://www.uiua.org/docs/wait">

# [wait](/docs/wait)

### Monadic function

Wait for a thread to finish and push its results to the stack

The argument must be a thread id returned by [spawn](/docs/spawn) or [pool](/docs/pool).

```uiua
wait spawn(/+⇡) 10
```

```output
45
```
  
If the thread id has already been [wait](/docs/wait)ed on, then an error is thrown.

```uiua
h ← spawn(/+⇡) 10
wait h
wait h
```

```output
Error: Invalid thread id
  at 3:1
3 | wait h
    ────
```
  
[wait](/docs/wait) is pervasive and will call [∵ each](/docs/each) implicitly.

```uiua
↯3_3⇡9
wait≡spawn/+.
```

```output
╭─       
╷ 0 1 2  
  3 4 5  
  6 7 8  
        ╯
[3 12 21]
```

</page>

<page url="https://www.uiua.org/docs/range">

# [⇡ range](/docs/range)

### Monadic function

Make an array of all natural numbers less than a number

The rank of the input must be `0` or `1`.

```uiua
⇡5
```

```output
[0 1 2 3 4]
```

```uiua
⇡2_3
```

```output
╭─     
╷ 0 0  
╷ 0 1  
  0 2  
       
  1 0  
  1 1  
  1 2  
      ╯
```

```uiua
⇡[3]
```

```output
╭─   
╷ 0  
  1  
  2  
    ╯
```
  
When creating ranges with upper bounds that are rank `1`, [⊡ pick](/docs/pick)ing the generated range array from an array with the [△ shape](/docs/shape) of the input will yield that array.

```uiua
    [1_2_3 4_5_6]
   △[1_2_3 4_5_6]
  ⇡△[1_2_3 4_5_6]
⊡⇡△.[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
[2 3]
╭─     
╷ 0 0  
╷ 0 1  
  0 2  
       
  1 0  
  1 1  
  1 2  
      ╯
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```
  
Taking the [⇡ range](/docs/range) of a negative number will yield a decreasing sequence starting at `¯1`.

```uiua
⇡¯5
```

```output
[¯1 ¯2 ¯3 ¯4 ¯5]
```

[⊡ pick](/docs/pick)ing from an array with the [⇡ range](/docs/range) of its [¯ negate](/docs/negate)d [△ shape](/docs/shape) will reverse all elements.

```uiua
      [1_2_3 4_5_6]
⊡⇡¯△. [1_2_3 4_5_6]
 ⍜♭⇌  [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
╭─       
╷ 6 5 4  
  3 2 1  
        ╯
╭─       
╷ 6 5 4  
  3 2 1  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/on">

# [⟜ on](/docs/on)

### Monadic modifier

Call a function but keep its first argument on the top of the stack

```uiua
[⟜+ 2 5]
[⟜- 2 5]
```

```output
[2 7]
[2 3]
```

```uiua
÷⟜⇡ 10
```

```output
[0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]
```

```uiua
+⟜(⇡-) 4 10
```

```output
[4 5 6 7 8 9]
```

```uiua
+⟜(×-) 10 20 0.3
```

```output
13
```

```uiua
↯⟜⊚ 4
```

```output
╭─         
╷ 0 0 0 0  
  0 0 0 0  
  0 0 0 0  
  0 0 0 0  
          ╯
```
  
[⟜ on](/docs/on) can be thought of as a compliment of [. duplicate](/docs/duplicate).

```uiua
[¯. 1]
[⟜¯ 1]
```

```output
[¯1 1]
[1 ¯1]
```
  
[⟜ on](/docs/on) in planet notation acts as a way of [. duplicate](/docs/duplicate)ing a value.

You can read [⟜](/docs/on)[⊙](/docs/dip) or [⟜](/docs/on)[∘](/docs/identity) as a single unit that keeps 2 copies of the value at that position.

```uiua
[⟜⊙⋅⟜⊙◌   1 2 3 4] # Easy to read with ⟜
[.⊙⋅(.⊙◌) 1 2 3 4] # Hard to read with .
[∩⊓.◌     1 2 3 4] # Shorter, maybe hard to read
```

```output
[1 1 3 3]
[1 1 3 3]
[1 1 3 3]
```

```uiua
[⊙⟜⊙⋅⟜∘  1 2 3 4] # Easy to read with ⟜
[⊙(.⊙⋅.) 1 2 3 4] # Hard to read with .
[⊙.⊙⊙⋅.  1 2 3 4] # Hard to read with .
```

```output
[1 2 2 4 4]
[1 2 2 4 4]
[1 2 2 4 4]
```
  
[⟜ on](/docs/on) is equivalent to [⊃ fork](/docs/fork)[∘ identity](/docs/identity), but can often be easier to read.

</page>

<page url="https://www.uiua.org/docs/with">

# [⤚ with](/docs/with)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Call a function but keep its first argument under the outputs on the stack

```uiua
# Experimental!
[⤚+ 2 5]
[⤚- 2 5]
```

```output
[7 2]
[3 2]
```

[⤚ with](/docs/with) can be used to copy a value from the top of the stack to a position deeper, or to move it.

```uiua
# Experimental!
[⤚⊙⊙⊙∘ 1 2 3 4]
[⤚⋅⊙⊙∘ 1 2 3 4]
```

```output
[1 2 3 4 1]
[2 3 4 1]
```

[⤚ with](/docs/with) always takes at least 2 arguments, even if its function takes fewer.

```uiua
# Experimental!
[⤚¯ 2]
```

```output
Error: Stack was empty evaluating argument 2
  at 2:2
2 | [⤚¯ 2]
     ─
```

```uiua
# Experimental!
[⤚¯ 2 5]
```

```output
[¯2 5 2]
```

</page>

<page url="https://www.uiua.org/docs/&ad">

# [&ad](/docs/&ad) \- audio - decode

### Monadic 3-output function

Decode audio from a byte array

Returns the audio format as a string, the audio sample rate, and an array representing the audio samples.

Only the `wav` format is supported.
  
See also: [&ae](/docs/&ae)

</page>

<page url="https://www.uiua.org/docs/&raw">

# [&raw](/docs/&raw) \- set raw mode

### Monadic 0-output function

Set the terminal to raw mode

Expects a boolean.

If enabled, the terminal will not echo characters or wait for a newline.
  
[&sc](/docs/&sc) will still work, but it will not return until the user presses enter.

To get individual characters, use [&rs](/docs/&rs) or [&rb](/docs/&rb) with a count of `1` and a handle of `0`, which is stdin.

</page>

<page url="https://www.uiua.org/install">

## [Installing Uiua](#installing-uiua)

If your OS is supported, then the newest version of the Uiua interpreter can be downloaded from the [releases](https://github.com/uiua-lang/uiua/releases) page.

Otherwise, the native Uiua interpreter can be installed via Cargo.

This requires a [Rust](https://www.rust-lang.org/tools/install) installation (>=1.75).

Once you have that, run the following command:

```
cargo install uiua
```

On Linux, this may require installing some dependencies:

```
apt install libx11-dev
```

The following optional features are available but not enabled by default (enabled by passing `--features <feature>`):

* `audio` \- Enables audio system functions.  
On Linux, this may require installing some dependencies:  
```  
apt install libasound2-dev libudev-dev pkg-config  
```
* `webcam` \- Enables webcam system functions.  
On Linux, this may require installing some dependencies:  
```  
apt install libjpeg-dev  
```

If you want the most recent development version of Uiua, you can install from the git repository.

```
cargo install --git https://github.com/uiua-lang/uiua uiua
```

## [Fonts](#fonts)

Uiua supports a few custom fonts, but [Uiua386](https://github.com/uiua-lang/uiua/raw/main/site/Uiua386.ttf) is the primary one.

* [Uiua386](https://github.com/uiua-lang/uiua/raw/main/site/Uiua386.ttf) \- inspired by APL386\. Thanks to Gifti for making it!
* Jonathan Perret's [Uiua386Color](https://github.com/jonathanperret/uiua386color) \- a colored version of Uiua386
* [DejaVuSansMono](https://github.com/uiua-lang/uiua/raw/main/site/DejaVuSansMono.ttf) \- a modified version

Uiua was originally designed to be used with stock [DejaVu Sans Mono](https://dejavu-fonts.github.io), but further development and glyph choices target Uiua386.

## [Editor Support](#editor-support)

An official [Uiua language extension for VSCode](https://marketplace.visualstudio.com/items?itemName=uiua-lang.uiua-vscode) is available.

For Neovim, Apeiros-46B maintains [syntax](https://github.com/Apeiros-46B/nvim/blob/main/after/syntax/uiua.vim) and [LSP](https://github.com/Apeiros-46B/nvim/blob/main/after/ftplugin/uiua.lua) scripts.

For Vim, sputnick1124 maintains a [Uiua plugin](https://github.com/sputnick1124/uiua.vim).

For Emacs, crmsnbleyd maintains a [Uiua mode](https://github.com/crmsnbleyd/uiua-ts-mode).

These require Uiua to be installed and in your `PATH`.

## [Basic Usage](#basic-usage)

Running just `uiua` will display the help message if there are no `.ua` files in the directory.

You can initialize a `main.ua` with `uiua init`.

Once a `.ua` file exists, running `uiua` will begin watching the directory for changes. If you edit and save a `.ua` file, the interpreter will automatically format and run it.

You should configure you editor so that it automatically reloads files if they change on disk. This will allow you to see the formatted file as soon as it is saved.

Use `uiua <PATH>` or `uiua run [PATH]` to format and run a file without watching it.

Use `uiua fmt [PATH]` to format a file without running it.

Use `uiua test [PATH]` to run tests.

</page>

<page url="https://www.uiua.org/docs/rotate">

# [↻ rotate](/docs/rotate)

### Dyadic function

Rotate the elements of an array by n

```uiua
↻1 ⇡5
```

```output
[1 2 3 4 0]
```

```uiua
↻2 ⇡5
```

```output
[2 3 4 0 1]
```

```uiua
↻¯1 ⇡5
```

```output
[4 0 1 2 3]
```

```uiua
↻2 .↯3_4⇡12
```

```output
╭─           
╷ 0 1  2  3  
  4 5  6  7  
  8 9 10 11  
            ╯
╭─           
╷ 8 9 10 11  
  0 1  2  3  
  4 5  6  7  
            ╯
```
  
Multi-dimensional rotations are supported.

```uiua
↻1_2 .↯4_5⇡20
```

```output
╭─                
╷  0  1  2  3  4  
   5  6  7  8  9  
  10 11 12 13 14  
  15 16 17 18 19  
                 ╯
╭─                
╷  7  8  9  5  6  
  12 13 14 10 11  
  17 18 19 15 16  
   2  3  4  0  1  
                 ╯
```
  
[⬚ fill](/docs/fill)[↻ rotate](/docs/rotate) fills in array elements instead of wrapping them.

```uiua
⬚0↻ 2 [1 2 3 4 5]
  ↻ 2 [1 2 3 4 5]
```

```output
[3 4 5 0 0]
[3 4 5 1 2]
```

```uiua
⬚0↻ 1_2 .↯4_5⇡20
```

```output
╭─                
╷  0  1  2  3  4  
   5  6  7  8  9  
  10 11 12 13 14  
  15 16 17 18 19  
                 ╯
╭─              
╷  7  8  9 0 0  
  12 13 14 0 0  
  17 18 19 0 0  
   0  0  0 0 0  
               ╯
```
  
[↻ rotate](/docs/rotate) works through boxes.

```uiua
↻1 □[1 2 3 4]
```

```output
⟦2 3 4 1⟧
```

```uiua
≡↻1 {1_2_3 4_5_6}
```

```output
{[2 3 1] [5 6 4]}
```

</page>

<page url="https://www.uiua.org/docs/join">

# [⊂ join](/docs/join)

### Dyadic function

Append two arrays end-to-end

For scalars, it is equivalent to [⊟ couple](/docs/couple).

```uiua
⊂ 1 2
⊟ 1 2
```

```output
[1 2]
[1 2]
```
  
If the arrays have the same rank, it will append the second array to the first.

```uiua
⊂ [1 2] [3 4]
```

```output
[1 2 3 4]
```

```uiua
⊂ [1_2 3_4] [5_6 7_8]
```

```output
╭─     
╷ 1 2  
  3 4  
  5 6  
  7 8  
      ╯
```
  
If the arrays have a rank difference of 1, then the array with the smaller rank will be prepended or appended to the other as a row.

```uiua
⊂ 1 [2 3]
```

```output
[1 2 3]
```

```uiua
⊂ [1 2] 3
```

```output
[1 2 3]
```

```uiua
⊂ 1_2 [3_4 5_6]
```

```output
╭─     
╷ 1 2  
  3 4  
  5 6  
      ╯
```

```uiua
⊂ [1_2 3_4] 5_6
```

```output
╭─     
╷ 1 2  
  3 4  
  5 6  
      ╯
```
  
If the arrays have a rank difference of 2 or more, then the array with the smaller rank will be repeated as rows to match the rank of the other.

This still requires the shape of the smaller array to be a suffix of the shape of the larger array.

```uiua
⊂ 0 [1_2 3_4]
```

```output
╭─     
╷ 0 0  
  1 2  
  3 4  
      ╯
```

```uiua
⊂ 1_2 [[3_4 5_6] [7_8 9_10]]
```

```output
╭─      
╷ 1  2  
╷ 1  2  
        
  3  4  
  5  6  
        
  7  8  
  9 10  
       ╯
```
  
By default, arrays that do not have equal [△ shape](/docs/shape) suffixes cannot be [⊂ join](/docs/join)ed.

```uiua
⊂ [1_2 3_4] [5_6_7 8_9_10]
```

```output
Error: Cannot join arrays of shapes [2 × 2] and [2 × 3]. 
  at 1:1
1 | ⊂ [1_2 3_4] [5_6_7 8_9_10]
    ─
```

Use [⬚ fill](/docs/fill) to make their shapes compatible.

```uiua
⬚0⊂ [1_2 3_4] [5_6_7 8_9_10]
```

```output
╭─        
╷ 1 2  0  
  3 4  0  
  5 6  7  
  8 9 10  
         ╯
```
  
[° un](/docs/un)[⊂ join](/docs/join) splits the first row of the array from the rest.

```uiua
°⊂ [1 2 3 4]
```

```output
[2 3 4]
1
```

```uiua
°⊂ [1_2 3_4 5_6]
```

```output
╭─     
╷ 3 4  
  5 6  
      ╯
[1 2]
```
  
[⊂ join](/docs/join)ing to the front of an array is a bit slower than [⊂ join](/docs/join)ing to the back because it requires all the existing rows to be shifted.
  
[⊂ join](/docs/join)'s glyph is `⊂` because it kind of looks like a magnet pulling its two arguments together.

</page>

<page url="https://www.uiua.org/docs/fork">

# [⊃ fork](/docs/fork)

### Dyadic modifier

Call two functions on the same values

[⊃ fork](/docs/fork) is one of the most important functions for working with the stack.

See the [Advanced Stack Manipulation Tutorial](/tutorial/advancedstack) for a more complete understanding as to why.
  
```uiua
⊃⇌◴ 1_2_2_3
```

```output
[1 2 3]
[3 2 2 1]
```

[⊃ fork](/docs/fork) can be chained to apply more functions to the arguments. `n` functions require the chaining of [\-](/docs/subtract)`1n` [⊃ fork](/docs/fork).

```uiua
[⊃⊃⊃+-×÷ 5 8]
```

```output
[13 3 40 1.6]
```

If the functions take different numbers of arguments, then the number of arguments is the maximum. Functions that take fewer than the maximum will work on the top values.

```uiua
[⊃+¯ 3 5]
```

```output
[8 ¯3]
```

</page>

<page url="https://www.uiua.org/docs/deshape">

# [♭ deshape](/docs/deshape)

### Monadic function

Make an array 1-dimensional

```uiua
♭5
```

```output
[5]
```

```uiua
♭[1 2 3]
```

```output
[1 2 3]
```

```uiua
♭.[1_2 3_4 5_6]
```

```output
╭─     
╷ 1 2  
  3 4  
  5 6  
      ╯
[1 2 3 4 5 6]
```
  
It looks like `♭` because it _flat_tens the array.
  
See also: [↯ reshape](/docs/reshape)

</page>

<page url="https://www.uiua.org/docs/&tcpaddr">

# [&tcpaddr](/docs/&tcpaddr) \- tcp - address

### Monadic function

Get the connection address of a TCP socket

</page>

<page url="https://www.uiua.org/docs/repeat">

# [⍥ repeat](/docs/repeat)

### Monadic modifier

Repeat a function a number of times

```uiua
⍥(+2)5 0
```

```output
10
```

```uiua
⍥(⊂2)5 []
```

```output
[2 2 2 2 2]
```

Repeating [∞ infinity](/docs/infinity) times will do a fixed-point iteration.

The loop will end when the top value of the function's output is equal to the top value of the function's input.

For example, this could be used to flatten a deeply nested array.

```uiua
⍥/◇⊂∞ {1 {2 3} {4 {5 6 {7}}}}
```

```output
[1 2 3 4 5 6 7]
```

The number of repetitions may be non-scalar. In this case, the function will be repeated each row of the input a different number of times.

```uiua
⍥(×2) [1 2 3 4] [5 5 5 5]
```

```output
[10 20 40 80]
```

If you want to conditionally either run some function or not, you can use [⍥ repeat](/docs/repeat) to repeat `0` or `1` times.

```uiua
F ← ⍥(×10)<10.
F 5
F 12
```

```output
50
12
```

[⍥ repeat](/docs/repeat)ing a negative number of times will repeat the function's [° un](/docs/un)\-inverse.

```uiua
⍥(×2)¯5 1024
```

```output
32
```
  
[⍥ repeat](/docs/repeat)'s glyph is a combination of a circle, representing a loop, and the 𝄇 symbol from musical notation.

</page>

<page url="https://www.uiua.org/docs/comptime">

# [comptime](/docs/comptime)

### Monadic modifier

Run a function at compile time

```uiua
F ← (⌊×10[⚂⚂⚂])
[F F F]
```

```output
╭─       
╷ 5 6 3  
  2 1 8  
  1 3 7  
        ╯
```

```uiua
F ← comptime(⌊×10[⚂⚂⚂])
[F F F]
```

```output
╭─       
╷ 5 0 6  
  5 0 6  
  5 0 6  
        ╯
```

[comptime](/docs/comptime)'s function must take no arguments.

If you would like to pass arguments to [comptime](/docs/comptime)'s function, make them part of the function

```uiua
comptime(+) 1 2
```

```output
Error: comptime's function must have no arguments, but it has 2
  at 1:1
1 | comptime(+) 1 2
    ────────
```

```uiua
comptime(+ 1 2)
```

```output
3
```

</page>

<page url="https://www.uiua.org/docs/sine">

# [∿ sine](/docs/sine)

### Monadic pervasive function

Get the sine of a number

```uiua
∿ 1
```

```output
0.8414709848078965
```

You can get a cosine function by [+ add](/docs/add)ing [η eta](/docs/eta).

```uiua
∿+η 1
```

```output
0.5403023058681398
```

You can get an arcsine function with [° un](/docs/un).

```uiua
°∿ 1
```

```output
η
```

You can get an arccosine function by [\- subtract](/docs/subtract)ing the arcsine from [η eta](/docs/eta).

```uiua
-:η°∿ 0
```

```output
η
```

You can get a tangent function by [÷ divide](/docs/divide)ing the [∿ sine](/docs/sine) by the cosine.

```uiua
÷∩∿+η. 0
```

```output
0
```

</page>

<page url="https://www.uiua.org/docs/keep">

# [▽ keep](/docs/keep)

### Dyadic function

Discard or copy some rows of an array

Takes two arrays. The first array is the number of copies to keep of each row of the second array.

```uiua
▽ [1 0 2 3 1] [8 3 9 2 0]
```

```output
[8 9 9 2 2 2 0]
```
  
By making the first array a mask derived from the second, [▽ keep](/docs/keep) becomes a filter.

In this example, the input string is [. duplicate](/docs/duplicate)ed, and a mask is created from it using [≥](/docs/greater or equal)`@a`. Then, [▽ keep](/docs/keep) uses the mask to filter the string.

```uiua
▽≥@a . "lOWERCASe onLY"
```

```output
"leon"
```
  
[▽ keep](/docs/keep) with a scalar for the first argument repeats each row of the second argument that many times.

```uiua
▽ 3 [1 2 3]
```

```output
[1 1 1 2 2 2 3 3 3]
```

```uiua
▽ 2 [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  1 2 3  
  4 5 6  
  4 5 6  
        ╯
```

This is in constrast to scalar [↯ reshape](/docs/reshape), which copies the array as rows of a new array.

```uiua
↯ 3 [1 2 3]
```

```output
╭─       
╷ 1 2 3  
  1 2 3  
  1 2 3  
        ╯
```

```uiua
↯ 2 [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
╷ 4 5 6  
         
  1 2 3  
  4 5 6  
        ╯
```
  
The counts list can be [⬚ fill](/docs/fill)ed if it is shorter than the kept array.

```uiua
⬚3▽ [1 0 2] [8 3 9 2 0]
```

```output
[8 9 9 2 2 2 0 0 0]
```

The fill value may be a list, in which case it will be repeated.

```uiua
⬚[1 2 0]▽ [0] ⇡10
```

```output
[1 2 2 4 5 5 7 8 8]
```
  
[° un](/docs/un)[▽ keep](/docs/keep) splits an array into a counts list and an array with adjacent similar rows deduplicated.

```uiua
°▽ "mississippi"
```

```output
"misisipi"
[1 1 2 1 2 1 2 1]
```
  
[⍜ under](/docs/under)[▽ keep](/docs/keep) allows you to modify part of an array according to a mask.

```uiua
⍜▽(+1) =@s. "mississippi"
```

```output
"mittittippi"
```
  
[▽ keep](/docs/keep)'s glyph is `▽` because its main use is to filter, and `▽` kind of looks like a coffee filter.

</page>

<page url="https://www.uiua.org/docs/add">

# [+ add](/docs/add)

### Dyadic pervasive function

Add values

```uiua
+1 2
```

```output
3
```

```uiua
+1 [2 3 4]
```

```output
[3 4 5]
```

```uiua
+ [1 2 3] [4 5 6]
```

```output
[5 7 9]
```

</page>

<page url="https://www.uiua.org/docs/&tcpsnb">

# [&tcpsnb](/docs/&tcpsnb) \- tcp - set non-blocking

### Monadic function

Set a TCP socket to non-blocking mode

</page>

<page url="https://www.uiua.org/docs/&fe">

# [&fe](/docs/&fe) \- file - exists

### Monadic function

Check if a file exists at a path

```uiua
&fe "example.txt"
```

```output
0
```

</page>

<page url="https://www.uiua.org/docs/bracket">

# [⊓ bracket](/docs/bracket)

### Dyadic modifier

Call two functions on two distinct sets of values

```uiua
⊓⇌◴ 1_2_3 [1 4 2 4 2]
```

```output
[1 4 2]
[3 2 1]
```

Each function will always be called on its own set of values.

```uiua
⊓+× 1 2 3 4
```

```output
12
3
```

The functions' signatures need not be the same.

```uiua
⊓+(++) 1 2 3 4 5
```

```output
12
3
```

[⊓ bracket](/docs/bracket) can be chained to apply additional functions to arguments deeper on the stack.

```uiua
⊓⊓⇌(↻1)△ 1_2_3 4_5_6 7_8_9
```

```output
[3]
[5 6 4]
[3 2 1]
```

```uiua
[⊓⊓⊓+-×÷ 10 20 5 8 3 7 2 5]
```

```output
[30 3 21 2.5]
```

```uiua
[⊓(+|-|×|÷) 10 20 5 8 3 7 2 5]
```

```output
[30 3 21 2.5]
```

[⊓ bracket](/docs/bracket) is a nice way to check if a number is within a range.

```uiua
×,,⊓≥≤5,8 . [6 2 5 9 6 5 0 4]
```

```output
[6 2 5 9 6 5 0 4]
[1 1 1 0 1 1 1 1]
[1 0 1 1 1 1 0 0]
[1 0 1 0 1 1 0 0]
```

</page>

<page url="https://www.uiua.org/docs/&tcpswt">

# [&tcpswt](/docs/&tcpswt) \- tcp - set write timeout

### Dyadic 0-output function

Set the write timeout of a TCP socket in seconds

</page>

<page url="https://www.uiua.org/docs/&s">

# [&s](/docs/&s) \- show

### Monadic 0-output function

Print a nicely formatted representation of a value to stdout

</page>

<page url="https://www.uiua.org/docs/&pf">

# [&pf](/docs/&pf) \- print and flush

### Monadic 0-output function

Print a value to stdout

</page>

<page url="https://www.uiua.org/docs/get">

# [get](/docs/get)

### Dyadic function

Get the value corresponding to a key in a map array

See [map](/docs/map) for an overview of map arrays.
  
```uiua
map 1_2 3_4
get 2 .
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
4
```

If the key is not found, an error is thrown.

```uiua
map 1_2 3_4
get 5 .
```

```output
Error: Key not found in map
  at 2:1
2 | get 5 .
    ───
```

You can use [⬚ fill](/docs/fill), [⍣ try](/docs/try), or [has](/docs/has) to avoid the error.

```uiua
map 1_2 3_4
⬚0get 5 .
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
0
```

```uiua
map 1_2 3_4
⍣get0 5 .
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
0
```

```uiua
map 1_2 3_4
⨬⋅⋅0get has,, 5 .
```

```output
╭─       
  1 → 3  
  2 → 4  
        ╯
0
```

You can provide a default value with [⬚ fill](/docs/fill).

```uiua
map 1_2 3_4
⬚0get 1 .
⬚0get 5 :
```

```output
3
0
```

You can use [⍜ under](/docs/under)[get](/docs/get) to modify the value at the key.

```uiua
/map⍉ [1_2 3_4 5_6]
⍜(get3|×10)
```

```output
╭─        
  1 →  2  
  3 → 40  
  5 →  6  
         ╯
```
  
See also: [insert](/docs/insert), [has](/docs/has), [remove](/docs/remove)

</page>

<page url="https://www.uiua.org/docs/&memcpy">

# [&memcpy](/docs/&memcpy) \- foreign function interface - copy

### Triadic function

⚠️ Warning 🧪: This function is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Copy data from a pointer into an array

_Warning ⚠️: \[&memcpy\] can lead to undefined behavior if used incorrectly._
  
This is useful for complex [&ffi](/docs/&ffi) calls that are meant to return arrays.

Expects a string indicating the type, a pointer, and a length.
  
The returned array will always be rank-`1`.

The type of the array depends on the given type.

Types are specified in the same way as in [&ffi](/docs/&ffi).

`"char"` will create a character array.

`"unsigned char"` will create a number array with efficient byte storage.

All other number types will create a normal number array.
  
For example, if we have a C function `int* get_ints(int len)` in a shared library `example.dll`, we can call it and copy the result like this:

```uiua
# Experimental!
Lib ← &ffi ⊂□"example.dll"
GetInts ← Lib {"int*" "get_ints" "int"}
&memcpy "int":3 GetInts 3
```
  
Importantly, [&memcpy](/docs/&memcpy) does _not_ free the memory allocated by the foreign function.

Use [&memfree](/docs/&memfree) to free the memory.

```uiua
# Experimental!
Lib ← &ffi ⊂□"example.dll"
GetInts ← Lib {"int*" "get_ints" "int"}
⊃&memfree(&memcpy "int":3) GetInts 3
```

</page>

<page url="https://www.uiua.org/docs/couple">

# [⊟ couple](/docs/couple)

### Dyadic function

Combine two arrays as rows of a new array

[⊢](/docs/first)[△](/docs/shape) of the coupled array will _always_ be `2`.
  
For scalars, it is equivalent to [⊂ join](/docs/join).

```uiua
⊟ 1 2
⊂ 1 2
```

```output
[1 2]
[1 2]
```

For arrays, a new array is created with the first array as the first row and the second array as the second row.

```uiua
⊟ [1 2 3] [4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

[° un](/docs/un)[⊟ couple](/docs/couple) uncouples a [⧻ length](/docs/length) `2` array and pushes both rows onto the stack.

```uiua
°⊟ .[1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
[4 5 6]
[1 2 3]
```

```uiua
°⊟ [1_2 3_4]
```

```output
[3 4]
[1 2]
```
  
If one array's shape is a suffix of the other's, the smaller array will be repeated to match the shape of the larger array.

```uiua
⊟ [1 2 3] 4
```

```output
╭─       
╷ 1 2 3  
  4 4 4  
        ╯
```

```uiua
⊟ [1_2 3_4] 5
```

```output
╭─     
╷ 1 2  
╷ 3 4  
       
  5 5  
  5 5  
      ╯
```

```uiua
⊟ [1_2 3_4] 5_6
```

```output
╭─     
╷ 1 2  
╷ 3 4  
       
  5 6  
  5 6  
      ╯
```
  
By default, arrays with different shape suffixes cannot be [⊟ couple](/docs/couple)d.

```uiua
⊟ [1 2 3] [4 5]
```

```output
Error: Cannot couple arrays with shapes [3] and [2]
  at 1:1
1 | ⊟ [1 2 3] [4 5]
    ─
```

Use [⬚ fill](/docs/fill) to make their shapes match

```uiua
⬚∞⊟ [1 2 3] [4 5]
```

```output
╭─       
╷ 1 2 3  
  4 5 ∞  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/&fras">

# [&fras](/docs/&fras) \- file - read all to string

### Monadic function

Read all the contents of a file into a string

Expects a path and returns a rank-`1` character array.
  
```uiua
&fras "example.txt"
```

```output
"This is a simple text file for \nuse in example Uiua code ✨"
```

You can use [⍜ under](/docs/under)[&fras](/docs/&fras) to write back to the file after modifying the string.

```uiua
⍜&fras(⊂:"\n# Wow!") "example.txt"
&p&fras "example.txt"
```

```output
This is a simple text file for 
use in example Uiua code ✨
# Wow!

```
  
See [&frab](/docs/&frab) for reading into a byte array.

</page>

<page url="https://www.uiua.org/docs/&tcpa">

# [&tcpa](/docs/&tcpa) \- tcp - accept

### Monadic function

Accept a connection with a TCP or TLS listener

Returns a stream handle

[⍜ under](/docs/under)[&tcpl](/docs/&tcpl) calls [&cl](/docs/&cl) automatically.

</page>

<page url="https://www.uiua.org/docs/regex">

# [regex](/docs/regex)

### Dyadic function

Match a regex pattern

Returns a rank-2 array of [□ box](/docs/box)ed strings, with one string per matching group and one row per match

```uiua
regex "h([io])" "hihaho"
```

```output
╭─          
╷ ⌜hi⌟ ⌜i⌟  
  ⌜ho⌟ ⌜o⌟  
           ╯
```

```uiua
regex "hi" "dog"
△.
```

```output
╭─       
╷ 0×1 □  
        ╯
[0 1]
```

```uiua
regex "[a-z]+" "hello world"
```

```output
╭─         
╷ ⌜hello⌟  
  ⌜world⌟  
          ╯
```

Escaped regex characters must be double-escaped.

```uiua
regex "\\d+" "123"
```

```output
╭─       
╷ ⌜123⌟  
        ╯
```

```uiua
P ← $"(\\d{_})"
regex $"_-_-_"P3P3P4 "123-456-7890"
```

```output
╭─                                   
╷ ⌜123-456-7890⌟ ⌜123⌟ ⌜456⌟ ⌜7890⌟  
                                    ╯
```

Regex patterns with optional captures can be used with [⬚ fill](/docs/fill).

```uiua
⬚(□"")regex "a(b)?" "a ab"
```

```output
╭─          
╷ ⌜a⌟  ⌜⌟   
  ⌜ab⌟ ⌜b⌟  
           ╯
```
  
Uiua uses the [Rust regex crate](https://docs.rs/regex/latest/regex/) internally.

</page>

<page url="https://www.uiua.org/tutorial/testing">

# Testing

## [Test Scopes](#test-scopes)

A [scoped module](/tutorial/modules#scoped-modules) with the name `test` is special in that is only run when the code is run with `uiua test`. It is meant to be used with [⍤ assert](/docs/assert).

```uiua
Square ← ×.
---test
⍤.=9 Square 3
⍤.=225 Square 15
---
```

[⍤ assert](/docs/assert) will return an error when its second argument is anything other than `1`.

```uiua
Square ← ×.
---test
⍤.=25 Square 4
---
```

```output
Error: 0
  at 3:1
3 | ⍤.=25 Square 4
    ─
```

The first argument to [⍤ assert](/docs/assert) is the value that will be thrown if the assertion fails. In the examples above, we have simply been [. duplicate](/docs/duplicate)ing the test value. We can throw a message instead.

```uiua
Square ← ×.
---test
⍤"3² is not 9!" =9 Square 3
⍤"4² is not 25!" =25 Square 4
---
```

```output
Error: 4² is not 25!
  at 4:1
4 | ⍤"4² is not 25!" =25 Square 4
    ─
```

One nice pattern for writing tests is to put the expected result before the test computation and use [⍤](/docs/assert)[⟜](/docs/on)[≍](/docs/match)[:](/docs/flip).

If the result does not match the expectation, that incorrect result will be thrown.

```uiua
---test
⍤⟜≍: 4 +2 2 # Passes
---
```

```uiua
---test
⍤⟜≍: [2 3 5] +1 [1 2 3]
---
#     ↓↓↓↓↓↓
```

```output
Error: [2 3 4]
  at 2:1
2 | ⍤⟜≍: [2 3 5] +1 [1 2 3]
    ─
```

## [Run Modes](#run-modes)

Whether tests will run or not depends on how you run the code.

On this website, both test and non-test code will always be run.

However, if you use the [native interpreter](/docs/install), you have a few options.

`uiua watch` will run all code, including tests.

`uiua run` will only run non-test code.

`uiua test` will only run test code, but also any non-test bindings and any non-test code which makes imports.
  
---

Hooray! You've reached the end of the tutorial!

To keep going with Uiua, you can check out:

* [The list of all functions](/docs#functions)
* [Other tutorials about more specific topics](/docs#other-tutorials)
* [Other language topics](/docs#other-docs)
* The online [pad](/pad) for writing longer code

</page>

<page url="https://www.uiua.org/docs/flip">

# [: flip](/docs/flip)

### Dyadic 2-output function

Swap the top two values on the stack

```uiua
[: 1 2 3 4 5]
```

```output
[2 1 3 4 5]
```
  
When combined with [. duplicate](/docs/duplicate), you can apply two different functions to the same value.

If you have two functions `f` and `g`, the pattern `f`[:](/docs/flip)`g`[.](/docs/duplicate) will call both functions on the top value.

This is a very common pattern.

For example, maybe you want to find all the uppercase letters in a string.

```uiua
$ Characters On uppercase OnLy
▽ ×≥@A:≤@Z. .
```

```output
"COOL"
```

</page>

<page url="https://www.uiua.org/docs/fold">

# [∧ fold](/docs/fold)

### Monadic modifier

Apply a function to aggregate arrays

Expects as many arguments as its function takes.

The function must take at least 1 more argument than it returns.

Arguments that are lower on the stack that will be used as accumulators.

Arguments that are higher on the stack will be iterated over.

The function will be repeatedly called with the rows of the iterated arrays, followed by the accumulators.

On each iteration, the returned values will be used as the new accumulators.
  
For example, [∧ fold](/docs/fold) can be used to [/ reduce](/docs/reduce) an array with a default value.

```uiua
∧+ [1 2 3] 10
∧+ [] 10
```

```output
16
10
```
  
Multiple accumulators can be used

```uiua
∧(⊃+(×⊙⋅∘)) +1⇡5 0 1
```

```output
120
15
```

If the iterated array is already on the stack, you can use [⊙ dip](/docs/dip) to place the accumulators below it.

```uiua
∧(⊃+(×⊙⋅∘))⊙(0 1) +1⇡5
```

```output
120
15
```
  
Multiple iterated arrays are also fine.

Here, we accumulate the first array with [+ add](/docs/add) and the second with [× multiply](/docs/multiply).

```uiua
∧⊃(+⊙⋅∘)(×⋅⊙⋅∘) 1_2_3 4_5_6 0 1
```

```output
120
6
```
  
Like [≡ rows](/docs/rows), [∧ fold](/docs/fold) will repeat the row of arrays that have exactly one row.

```uiua
∧(⊂⊂) 1_2_3 4 []
```

```output
[3 4 2 4 1 4]
```
  
Here is a reimplementation of [\\ scan](/docs/scan) using [∧ fold](/docs/fold).

```uiua
⇌∧(⊂+⊙(⊢.)) ⊃↘↙1 [1 2 3 4]
```

```output
[1 3 6 10]
```

</page>

<page url="https://www.uiua.org/docs/&fo">

# [&fo](/docs/&fo) \- file - open

### Monadic function

Open a file and return a handle to it

```uiua
&fo "example.txt"
```

```output
file example.txt(□3)
```

The file can be read from with [&rs](/docs/&rs), [&rb](/docs/&rb), or [&ru](/docs/&ru).

The file can be written to with [&w](/docs/&w).

In some cases, the file may not be actually written to until it is closed with [&cl](/docs/&cl).

[⍜ under](/docs/under)[&fo](/docs/&fo) calls [&cl](/docs/&cl) automatically.

</page>

<page url="https://www.uiua.org/docs/both">

# [∩ both](/docs/both)

### Monadic 2-argument modifier

Call a function on two sets of values

For monadic functions, [∩ both](/docs/both) calls its function on each of the top 2 values on the stack.

```uiua
∩⇡ 3 5
```

```output
[0 1 2 3 4]
[0 1 2]
```
  
For a function that takes `n` arguments, [∩ both](/docs/both) calls the function on the 2 sets of `n` values on top of the stack.

```uiua
[∩+ 1 2 3 4]
```

```output
[3 7]
```

```uiua
[∩(++) 1 2 3 4 5 6]
```

```output
[6 15]
```
  
[∩ both](/docs/both) can also be chained. Every additional [∩ both](/docs/both) doubles the number of arguments taken from the stack.

```uiua
[∩∩(□+2) 1 @a 2_3 5]
```

```output
{3 @c [4 5] 7}
```

```uiua
[∩∩∩± 1 ¯2 0 42 ¯5 6 7 8 99]
```

```output
[1 ¯1 0 1 ¯1 1 1 1 99]
```
  
There are two common patterns that involve a dyadic function and three values.

If we call the function `f` and the values `a`, `b`, and `c`, then the patterns are:

\- `fac fbc`

\- `fab fac`

Both involve applying a stack idiom before calling [∩ both](/docs/both).

For `fac fbc`, the idiom is [⊙](/docs/dip)[,](/docs/over).

For `fab fac`, the idiom is [⟜](/docs/on)[:](/docs/flip).

For example, if you wanted to check that a number is divisible by two other numbers:

```uiua
F ← ∩(=0◿) ⊙,
F 3 5 ⇡16
```

```output
[1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1]
[1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1]
```

```uiua
G ← ∩(=0◿:) ⟜:
G ⇡16 3 5
```

```output
[1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1]
[1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1]
```

</page>

<page url="https://www.uiua.org/docs/tryrecv">

# [tryrecv](/docs/tryrecv)

### Monadic function

Try to receive a value from a thread

Expects a thread id returned by [spawn](/docs/spawn) or [pool](/docs/pool).

The thread id `0` corresponds to the parent thread.

The sending thread can send a value with [send](/docs/send).
  
Unlike [recv](/docs/recv), [tryrecv](/docs/tryrecv) does not block.

If no value is available, then an error is thrown.

The error can be caught with [⍣ try](/docs/try).

</page>

<page url="https://www.uiua.org/tutorial/controlflow">

# Control Flow

Uiua, and array languages in general, require much less control flow than other programming languages. Most operations that would be loops in other languages are simply operations on arrays. Because boolean operations return numbers, a lot of checks that would be done with `if` statements in other languages become mathematical or indexing operations in array languages.

For example, if you wanted to split an array of numbers into an array of odds and an array of evens, you might do it like this in a language like Python:

```
def splitArray(array):
    even = []
    odd = []
    for i in array:
        if i % 2 == 0:
            even.append(i)
        else:
            odd.append(i)
    return even, odd

splitArray([1, 2, 3, 7, 2, 4, 5])
```

In Uiua, it is much simpler, and there are no `if`s or `for`s to be found:

```uiua
F ← ∩▽¬,,◿2.
F [1 2 3 7 2 4 5]
```

```output
[1 3 7 5]
[2 2 4]
```

That being said, not every problem lends itself to array operations. Uiua has a few methods for handling such cases.

## [Looping with ](#repeat-do)[⍥ repeat](/docs/repeat) and [⍢ do](/docs/do)

The [⍥ repeat](/docs/repeat) modifier takes a function and a number and calls the function that many times.

Here, we [× multiply](/docs/multiply) a number by `2`, `10` times.

```uiua
⍥(×2)10 5
```

```output
5120
```

```uiua
⍥/+2 ↯3_3⇡9
```

```output
36
```

[⍥ repeat](/docs/repeat)[⚂ random](/docs/random) inside `[]`s is a common pattern for generating a list of random numbers.

```uiua
⁅[⍥⚂]5
```

```output
[0 0 1 0 1]
```

[⍥ repeat](/docs/repeat) is also useful for conditionally calling a function. Because booleans in Uiua are just numbers, [⍥ repeat](/docs/repeat)ing with a boolean value will call a function `0` or `1` times.

```uiua
F ← ⍥(×10)<10.
F 5
F 12
```

```output
50
12
```

[⍥ repeat](/docs/repeat)'s glyph is a combination of a circle, representing a loop, and the 𝄇 symbol from musical notation.

The [⍢ do](/docs/do) modifier takes a loop function and a condition function. It repeatedly calls the loop function as long as the condition function returns `1`.

```uiua
⍢(×2|<1000) 1
```

```output
1024
```

```uiua
◌⍢(⊃(×2)⊂|<100) 1 []
```

```output
[64 32 16 8 4 2 1]
```

While [⍢ do](/docs/do) is very powerful, it should only be used when necessary.

[⍢ do](/docs/do) is the only way to do an infinite loop in Uiua. To do so, simply use `1` as the condition function.

## [Catching errors with ](#try)[⍣ try](/docs/try)

The [⍣ try](/docs/try) modifier takes two functions. If the first function throws an error, the second function is called to handle it.

The function must have the same number of outputs.

The handler function can take at most 1 more agument that the first function.

We can see how this works by using it with [⋕ parse](/docs/parse).

If the handler function has 0 arguments, then it is simply called. This is a nice way to provide default values in the event of a failure.

```uiua
⍣⋕0 "5"
⍣⋕0 "dog"
```

```output
5
0
```

If the handler function has 1 argument, then the original argument is passed to it.

```uiua
⍣⋕∘ "5"
⍣⋕∘ "dog"
```

```output
5
"dog"
```

If the handler function takes 1 more argument than the first function, then the error is also passed to it.

```uiua
⍣⋕{⊙∘} "5"
⍣⋕{⊙∘} "dog"
```

```output
5
{"dog" "2:2: Cannot parse into number: invalid float literal"}
```

You can read about more uses of [⍣ try](/docs/try) in its documentation.

## [](#switch)[⨬ switch](/docs/switch)

The [⨬ switch](/docs/switch) modifier uses a selector to choose one of its functions to call.

```uiua
⨬(3)(5) 0
⨬(3)(5) 1
```

```output
3
5
```

The selector goes above the arguments on the stack.

Here, we [+ add](/docs/add) if the selector is `0` and [\- subtract](/docs/subtract) if the selector is `1`.

```uiua
⨬+- 0 3 5
⨬+- 1 3 5
```

```output
8
2
```

Non-scalar selectors are allowed. They allow a different function to be evaluated for each row of the input array(s).

```uiua
⨬+- [1 0 1] [1 2 3] [4 5 6]
```

```output
[3 7 3]
```

[⨬ switch](/docs/switch) can use a [function pack](/tutorial/advancedstack#function-packs) to select from more functions.

```uiua
⨬(+|-|×|÷) [1 2 0 3] [...2] [...5]
```

```output
[3 10 7 2.5]
```

```uiua
⨬(×10|+1|⨬¯∘ =2.) ◿3. [2 9 4 0 8 3]
```

```output
[2 90 5 0 ¯8 30]
```

With [⊗ indexof](/docs/indexof), [⨬ switch](/docs/switch) can be used to implement behavior similar to `switch` statements in other languages.

```uiua
F ← (
  ⊗□:{"foo" "bar" "baz"}
  ⨬(+1|×10|÷2|¯)
)
F "foo" 5
F "bar" 5
F "baz" 5
F "wow" 5
```

```output
6
50
2.5
¯5
```

Each branch can have a signature specified. For the overall [⨬ switch](/docs/switch) to have a valid signature, all branches must either change the height of the stack by the same amount _or_ return the same number of outputs.

```uiua
F ← ⨬(|2 ×||3.2 ⊃(++)×)
[F 0 2 3 4]
[F 1 2 3 4]
```

```output
[6 4]
[9 6]
```

Signatures in [⨬ switch](/docs/switch) functions are a bit messy, so try to avoid them when possible.

Because a second `|` immediately after another indicates a signature, branches that do nothing must contain [∘ identity](/docs/identity).

```uiua
F ← ⨬(+5|∘|÷10)+∩>5,10.
[F2 F6 F200]
F[2 6 200]
```

```output
[7 6 20]
[7 6 20]
```

## [Recursion](#recursion)

A bound function that refers to its own name is a [recursive function](https://en.wikipedia.org/wiki/Recursion%5F%28computer%5Fscience%29). A function that calls itself can easily recurse infinitely, so it is important to have a _base case_ that stops the recursion when a condition is met. Switch functions are great for this.

As a simple example, here is a function that calculates the factorial of a number. Note that you should not actually do this, as [/](/docs/reduce)[×](/docs/multiply)[+](/docs/add)`1` is shorter, faster, and more idiomatic.

```uiua
Fact ← |1 ⨬(×Fact-1.|1)<2.
Fact 5
```

```output
120
```

The base case is when the input is `1`. In this case, the function returns `1`. Otherwise, it multiplies the input by the result of calling itself with the input decremented by `1`.

Recursive functions are required to have signatures declared.

Recursion is only recommended if a particular problem _really_ calls for it. Recursion in Uiua can be slow, and there is a limit to how deep you can recur.

It is usually better to use either array-based methods or iteration with [⍥ repeat](/docs/repeat) or [⍢ do](/docs/do).

## [](#assert)[⍤ assert](/docs/assert)

The [⍤ assert](/docs/assert) function takes any value and a condition. If the condition is anything but `1`, the value is thrown as an error that can be caught with [⍣ try](/docs/try).

```uiua
F ← ⍣(¯⍤10≤10.)∘
F 5
F 12
```

```output
¯5
12
```

If the [⍤ assert](/docs/assert)ed value is never caught, it becomes an error.

```uiua
F ← ¯⍤"too big!"≤10.
F 5
F 12
```

```output
Error: too big!
  at 1:6
1 | F ← ¯⍤"too big!"≤10.
         ─
  in F at 3:1
```

Using [⍤ assert](/docs/assert) for this purpose will be covered more in the [section on testing](/tutorial/testing).

</page>

<page url="https://www.uiua.org/tutorial/advancedarray">

# Advanced Array Manipulation

Sometimes the operation you need to perform on an array is more complicated than modifiers like [/ reduce](/docs/reduce), [≡ rows](/docs/rows), or [⊞ table](/docs/table) allow.

## [](#fix)[¤ fix](/docs/fix)

[≡ rows](/docs/rows) can be used to iterate over multiple arrays. The nth row of each array will be passed to the function, and the result will be put in a new array.

```uiua
≡⊂ 1_2_3 4_5_6
```

```output
╭─     
╷ 1 4  
  2 5  
  3 6  
      ╯
```

Usually, the arrays must have the same number of rows.

```uiua
≡⊂ 1_2_3 4_5
```

```output
Error: Cannot ≡ rows arrays with different number of rows 3 and 2
  at 1:1
1 | ≡⊂ 1_2_3 4_5
    ─
```

However, there is an exception for arrays that have exactly one row. In this case, that row will be repeated for each row of the other array(s).

```uiua
≡⊂ 1_2_3 4
```

```output
╭─     
╷ 1 4  
  2 4  
  3 4  
      ╯
```

```uiua
≡⊂ 1 2_3_4
```

```output
╭─     
╷ 1 2  
  1 3  
  1 4  
      ╯
```

```uiua
≡(⊂⊂) 1 2_3_4 5
```

```output
╭─       
╷ 1 2 5  
  1 3 5  
  1 4 5  
        ╯
```

Notice that the second argument here is a 2D array with 1 row of 2 elements. It will be repeated just like the scalars above.

```uiua
≡⊟ [1_2 3_4 5_6] [¯1_0]
```

```output
╭─      
╷  1 2  
╷ ¯1 0  
        
   3 4  
  ¯1 0  
        
   5 6  
  ¯1 0  
       ╯
```

If we want to combine each row of one array with copies of another, we can turn one of the arrays into a single row array with [¤ fix](/docs/fix). [¤ fix](/docs/fix) adds a 1 to the front of the shape of an array.

```uiua
¤.1_2_3
```

```output
[1 2 3]
╭─       
╷ 1 2 3  
        ╯
```

Here, we [¤ fix](/docs/fix) `1_2_3` so that it is reused for each row of `4_5_6`.

```uiua
≡⊂ ¤ 1_2_3 4_5_6
```

```output
╭─         
╷ 1 2 3 4  
  1 2 3 5  
  1 2 3 6  
          ╯
```

If we have a bunch of arrays and want to choose which ones are fixed and which are not, we can use planet notation.

```uiua
≡⊂ ⊙¤ 1_2_3 4_5_6
```

```output
╭─         
╷ 1 4 5 6  
  2 4 5 6  
  3 4 5 6  
          ╯
```

```uiua
≡(⊂⊂⊂) ⊓⊓⊓∘¤¤∘ 1_2_3 4_5_6 7_8_9 10_11_12
```

```output
╭─                  
╷ 1 4 5 6 7 8 9 10  
  2 4 5 6 7 8 9 11  
  3 4 5 6 7 8 9 12  
                   ╯
```

```uiua
≡(⊂⊂⊂) ⊙∩¤     1_2_3 4_5_6 7_8_9 10_11_12
```

```output
╭─                  
╷ 1 4 5 6 7 8 9 10  
  2 4 5 6 7 8 9 11  
  3 4 5 6 7 8 9 12  
                   ╯
```

[¤ fix](/docs/fix) also works without [≡ rows](/docs/rows) with pervasive dyadic functions.

```uiua
-  [1 2 3]  [4 5 6]
- ¤[1 2 3]  [4 5 6]
-  [1 2 3] ¤[4 5 6]
```

```output
[3 3 3]
╭─       
╷ 3 2 1  
  4 3 2  
  5 4 3  
        ╯
╭─       
╷ 3 4 5  
  2 3 4  
  1 2 3  
        ╯
```

```uiua
-  1_3 [3_4 5_6 7_8]
```

```output
Error: Shapes [2] and [3 × 2] do not match
  at 1:1
1 | -  1_3 [3_4 5_6 7_8]
    ─
```

```uiua
- ¤1_3 [3_4 5_6 7_8]
```

```output
╭─     
╷ 2 1  
  4 3  
  6 5  
      ╯
```

## [](#rerank)[☇ rerank](/docs/rerank)

The above examples dig into an array from the top down. But what if you want to think about the array from the _bottom up_?

The [☇ rerank](/docs/rerank) function changes the rows of an array to have the specified rank.

```uiua
☇3 ↯2_2_2_5⇡40 # The rows are already rank 3
```

```output
╭─                
╷  0  1  2  3  4  
╷  5  6  7  8  9  
╷                 
  10 11 12 13 14  
  15 16 17 18 19  
                  
  20 21 22 23 24  
  25 26 27 28 29  
                  
  30 31 32 33 34  
  35 36 37 38 39  
                 ╯
```

```uiua
☇2 ↯2_2_2_5⇡40
```

```output
╭─                
╷  0  1  2  3  4  
╷  5  6  7  8  9  
                  
  10 11 12 13 14  
  15 16 17 18 19  
                  
  20 21 22 23 24  
  25 26 27 28 29  
                  
  30 31 32 33 34  
  35 36 37 38 39  
                 ╯
```

```uiua
☇1 ↯2_2_2_5⇡40
```

```output
╭─                
╷  0  1  2  3  4  
   5  6  7  8  9  
  10 11 12 13 14  
  15 16 17 18 19  
  20 21 22 23 24  
  25 26 27 28 29  
  30 31 32 33 34  
  35 36 37 38 39  
                 ╯
```

```uiua
☇0 ↯2_2_2_5⇡40 # Equivalent to ♭ deshape
```

```output
[0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39]
```

You can then use [≡ rows](/docs/rows) to iterate over arrays of that rank.

```uiua
≡□ ☇1 ↯2_2_2_3⇡24
```

```output
{[0 1 2] [3 4 5] [6 7 8] [9 10 11] [12 13 14] [15 16 17] [18 19 20] [21 22 23]}
```

You can think of [☇ rerank](/docs/rerank) as combining the dimensions of the array that are above the specified rank into a single dimension.

In the example above, the shape information of the original array is lost.

If you want to keep the part of the shape that is above the specified rank, you can use [⍜ under](/docs/under). This will _uncombine_ the combined dimensions after the operation is complete.

```uiua
⍜(☇1)≡□ ↯2_2_2_3⇡24
```

```output
╭─                       
╷ ⟦0 1 2⟧    ⟦3 4 5⟧     
╷ ⟦6 7 8⟧    ⟦9 10 11⟧   
                         
  ⟦12 13 14⟧ ⟦15 16 17⟧  
  ⟦18 19 20⟧ ⟦21 22 23⟧  
                        ╯
```

Notice in the above example that we specified the rank `1`, and it was rank `1` arrays that were [□ box](/docs/box)ed.

We can think of this pattern as allowing us to operate on arrays of the specified rank within the greater array. For example, by changing the rank to `2`, we end up [□ box](/docs/box)ing matrices instead of lists.

```uiua
⍜(☇2)≡□ ↯2_2_2_3⇡24
```

```output
╭─                           
╷  ╓─          ╓─            
   ╟ 0 1 2     ╟ 6  7  8     
     3 4 5       9 10 11     
           ╜             ╜   
  ╓─           ╓─            
  ╟ 12 13 14   ╟ 18 19 20    
    15 16 17     21 22 23    
             ╜            ╜  
                            ╯
```

The specified rank can still be dynamic in this case by simply putting it on the stack.

```uiua
⍜☇≡□ 1 ↯2_2_2_3⇡24
```

```output
╭─                       
╷ ⟦0 1 2⟧    ⟦3 4 5⟧     
╷ ⟦6 7 8⟧    ⟦9 10 11⟧   
                         
  ⟦12 13 14⟧ ⟦15 16 17⟧  
  ⟦18 19 20⟧ ⟦21 22 23⟧  
                        ╯
```

```uiua
⍜☇≡□ 2 ↯2_2_2_3⇡24
```

```output
╭─                           
╷  ╓─          ╓─            
   ╟ 0 1 2     ╟ 6  7  8     
     3 4 5       9 10 11     
           ╜             ╜   
  ╓─           ╓─            
  ╟ 12 13 14   ╟ 18 19 20    
    15 16 17     21 22 23    
             ╜            ╜  
                            ╯
```

You can use [⍜ under](/docs/under)[∩ both](/docs/both)[☇ rerank](/docs/rerank) to [☇ rerank](/docs/rerank) 2 arrays. Here, we insert one of the ranks for [☇ rerank](/docs/rerank) using [⊙ dip](/docs/dip).

```uiua
⍜∩☇≡⊂ 1⊙1 ↯6_2⇡12 ↯2_3_4⇡24
```

```output
╭─                   
╷  0  1  0  1  2  3  
   2  3  4  5  6  7  
   4  5  8  9 10 11  
   6  7 12 13 14 15  
   8  9 16 17 18 19  
  10 11 20 21 22 23  
                    ╯
```

## [Multi-dimensional ](#table)[⊞ table](/docs/table)

[⊞ table](/docs/table) called on arrays of multiple dimensions calls its function on all _combinations_ of rows of its arguments.

```uiua
⊞⊂ η_π_τ ↯3_3⇡9
```

```output
╭─         
╷ η 0 1 2  
╷ η 3 4 5  
  η 6 7 8  
           
  π 0 1 2  
  π 3 4 5  
  π 6 7 8  
           
  τ 0 1 2  
  τ 3 4 5  
  τ 6 7 8  
          ╯
```

[⊞ table](/docs/table) can be useful when working with [☇ rerank](/docs/rerank)ed or [¤ fix](/docs/fix)ed arrays.

In this example, we apply a table of rotations to each matrix cell of a 3D array.

```uiua
°⊚ ≡[..]⇡3           # Target array
[0_0 0_1]_[¯1_1 1_0] # Rotations table
,,                   # Copy to see inputs
⍜(☇1)⊞↻              # All rotation combinations
≡≡□                  # Box for display
```

```output
╭─       
╷ 1 0 0  
╷ 0 0 0  
  0 0 0  
         
  0 0 0  
  0 1 0  
  0 0 0  
         
  0 0 0  
  0 0 0  
  0 0 1  
        ╯
╭─      
╷  0 0  
╷  0 1  
        
  ¯1 1  
   1 0  
       ╯
╭─                     
╷ ╓─        ╓─         
  ╟ 1 0 0   ╟ 0 0 1    
  ╟ 0 0 0   ╟ 0 0 0    
    0 0 0     0 0 0    
                       
    0 0 0     0 0 0    
    0 1 0     1 0 0    
    0 0 0     0 0 0    
                       
    0 0 0     0 0 0    
    0 0 0     0 0 0    
    0 0 1     0 1 0    
          ╜         ╜  
  ╓─        ╓─         
  ╟ 0 0 0   ╟ 0 0 0    
  ╟ 0 0 1   ╟ 0 0 0    
    0 0 0     1 0 0    
                       
    0 0 0     0 1 0    
    0 0 0     0 0 0    
    1 0 0     0 0 0    
                       
    0 1 0     0 0 0    
    0 0 0     0 0 1    
    0 0 0     0 0 0    
          ╜         ╜  
                      ╯
```

</page>

<page url="https://www.uiua.org/docs/first">

# [⊢ first](/docs/first)

### Monadic function

Get the first row of an array

```uiua
⊢1_2_3
```

```output
1
```

```uiua
⊢[1_2 3_4 5_6]
```

```output
[1 2]
```

```uiua
⊢1
```

```output
1
```

```uiua
⊢[]
```

```output
Error: Cannot take first of an empty array
  at 1:1
1 | ⊢[]
    ─
```
  
[⊢ first](/docs/first)[⇌ reverse](/docs/reverse) is optimized in the interpreter to be O(1).

```uiua
⊢⇌ [1 8 4 9 2 3]
```

```output
3
```

</page>

<page url="https://www.uiua.org/docs/triangle">

# [◹ triangle](/docs/triangle)

### Monadic modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Apply a function to each shrinking row of an array

Similar to [≡ rows](/docs/rows), [◹ triangle](/docs/triangle) calls its function on each row of an array.

However, [◹ triangle](/docs/triangle) will call its function on a descreasing-size suffix of each row.

We can see an example of what this means with [◹ triangle](/docs/triangle)[□ box](/docs/box).

```uiua
# Experimental!
◹□ . ↯4_4⇡16
```

```output
╭─             
╷  0  1  2  3  
   4  5  6  7  
   8  9 10 11  
  12 13 14 15  
              ╯
{[0 1 2 3] [5 6 7] [10 11] [15]}
```

Notice that the elements included correspond to the upper-right [◹ triangle](/docs/triangle) of the input array.
  
Non-square arrays will have extra rows either be truncated or longer.

```uiua
# Experimental!
◹□ . ↯3_4⇡12
```

```output
╭─           
╷ 0 1  2  3  
  4 5  6  7  
  8 9 10 11  
            ╯
{[0 1 2 3] [5 6 7] [10 11]}
```

```uiua
# Experimental!
◹□ . ↯5_3⇡15
```

```output
╭─          
╷  0  1  2  
   3  4  5  
   6  7  8  
   9 10 11  
  12 13 14  
           ╯
{[0 1 2] [4 5] [8]}
```

You can use [◹ triangle](/docs/triangle)[⊢ first](/docs/first) to get the diagonal of an array.

```uiua
# Experimental!
◹⊢ . ↯3_4⇡12
```

```output
╭─           
╷ 0 1  2  3  
  4 5  6  7  
  8 9 10 11  
            ╯
[0 5 10]
```

If [◹ triangle](/docs/triangle)'s function takes more than one argument, then it functions similarly to [⊞ table](/docs/table), except some of the combinations are skipped.

For example, we can use [◹ triangle](/docs/triangle)[⊟ couple](/docs/couple) to get all unique combinations of rows from two arrays.

Notice the difference from [⊞ table](/docs/table).

```uiua
# Experimental!
☇1⊞⊟ ⇡3⇡3
◹⊟ ⇡3⇡3
```

```output
╭─     
╷ 0 0  
  0 1  
  0 2  
  1 0  
  1 1  
  1 2  
  2 0  
  2 1  
  2 2  
      ╯
╭─     
╷ 0 0  
  0 1  
  0 2  
  1 1  
  1 2  
  2 2  
      ╯
```

We can also see the pattern by rearranging the combinations with [⊕ group](/docs/group).

```uiua
# Experimental!
◹⊂.⇡4
⊕□≡°⊟ .
⬚0⊕∘≡°⊟ :
```

```output
{[0 1 2 3] [1 2 3] [2 3] [3]}
╭─         
╷ 0 1 2 3  
  1 2 3 0  
  2 3 0 0  
  3 0 0 0  
          ╯
```

[◹ triangle](/docs/triangle) also works with 3-argument functions (but currently no more).

```uiua
# Experimental!
◹(⊂⊂)..⇡3
```

```output
╭─       
╷ 0 0 0  
  0 0 1  
  0 0 2  
  0 1 1  
  0 1 2  
  0 2 2  
  1 0 1  
  1 0 2  
  1 1 2  
  2 0 2  
        ╯
```

It follows the same pattern that we can see with [⊕ group](/docs/group).

```uiua
# Experimental!
◹(⊂⊂)..⇡3
⊕(□⊕□≡°⊟)≡°⊂ .
⬚0⊕(⬚0⊕∘≡°⊟)≡°⊂ :
```

```output
{{[0 1 2] [1 2] [2]} {[1 2] [2]} {[2]}}
╭─       
╷ 0 1 2  
╷ 1 2 0  
  2 0 0  
         
  1 2 0  
  2 0 0  
  0 0 0  
         
  2 0 0  
  0 0 0  
  0 0 0  
        ╯
```

</page>

<page url="https://www.uiua.org/docs/design">

# Design

This page explains the reasons for some of Uiua's design decisions.

It serves as a [defense of design](https://news.knowledia.com/US/en/articles/more-software-projects-need-defenses-of-design-85ea9e23ffd85f5fde5a2d3d42001393cbce169a).

## [Stack Basing](#stack-basing)

### Combinators

When I first started developing Uiua, it was neither stack-based nor array-oriented. What it _did_ focus a lot on was _combinators_. I had this whole hierarchy of language-level operators that let you construct arbitrarily complex combinators relatively succinctly.

I discovered what a lot of others have discovered when delving deep into tacit code: it's really hard to read and write and reason about.

Eventually, I moved to a stack-based model and discovered that you can write almost any 1 or 2 argument combinator with just [. duplicate](/docs/duplicate), [, over](/docs/over), and [: flip](/docs/flip).

Of course, I also made the discovery that juggling 3 or more values on the stack also imposes a high cognitive load on the developer. This is especially true if you try to _rotate_ the stack like you could with the now-removed functions`roll` and `unroll`. [⊙ dip](/docs/dip) replaced the rolling functions as it is more general and easier to reason about, and eventually grew into [Planet Notation](/tutorial/advancedstack#planet-notation).
  
### Expressions

Long tacit expressions in most array languages can get very unwieldy. Because binary operations are infix, you have to parse the tree structure in your head before you can start determining the order of operations.

For example, in BQN, you can trim matches from the beginning of a string with [x(∧\`∘∊˜¬⊸/⊢)y](https://mlochbaum.github.io/bqncrate/?q=Remove%20cells%20that%20appear%20in%20x%20from%20beginning%20of%20y#). 

In contrast, here is their equivalent in Uiua, implemented the same way:

```uiua
Trim ← ▽¬\×∊,
```

You'll notice that stack basing simplifies the expression in a few ways:

* There is no Uiua code corresponding to the BQN combinators `∘` and `⊸`. Function composition is implicit.
* Functions are executed right-to-left instead of in a tree ordering.
* The expression does not require `()`s. In fact, no Uiua expression requires explicit grouping. `()` is used to make inline functions instead.

I think this clarity makes writing long tacit expressions much more workable.

## [The Array Model](#array-model)

Uiua's array model went through a lot of iterations during development. At first, it used a flat, vector-based model ala K and Q. Then, I switched to BQN's Based array model. That was really complicated to implement primitives for, so I tried something else.

I switched to a flat array model with "fill elements". While arrays could not be nested, operations which would create nested arrays in other languages would instead create jagged arrays with special fill elements at the end of some rows. While this worked, the code was scattered everywhere with checks for fill elements, because they had to propagate through everything. It also had the unfortunate effect of making byte arrays take up 2 bytes of space, since a bit had to be used to indicate whether the byte was a fill element or not. Also, a lot of operations, such as [⍉ transpose](/docs/transpose), don't really make a lot of sense with jagged arrays.

Finally, I switched to the current model, which resembles J's Boxed array model. While you can do something resembling J's `box <` using [□ box](/docs/box) (and `open >` with [° un](/docs/un)[□ box](/docs/box)), I designed functions like [⊜ partition](/docs/partition) and [⊕ group](/docs/group) to allow selecting uniformly-shaped rows from a non-uniform list in an effort to minimize interaction with jagged data.

The fact that the stack is always available also makes putting non-uniform data in arrays less necessary.

## [The Glyphs](#glyphs)

Most of Uiua's glyphs were chosen for one of a few reasons:

* It is a common mathematical symbol, such as [+ add](/docs/add), [\- subtract](/docs/subtract), and [π pi](/docs/pi).
* It is a very commonly used function and should create little line noise, such as [. duplicate](/docs/duplicate) and [: flip](/docs/flip).
* It is used in other array languages, such as [/ reduce](/docs/reduce), [\\ scan](/docs/scan), and [⍉ transpose](/docs/transpose).
* It kind of reminds me of what it does. Some of my favorites are [⊞ table](/docs/table), [↯ reshape](/docs/reshape), [↻ rotate](/docs/rotate), [♭ deshape](/docs/deshape), and [⌕ find](/docs/find).
* Its function is kind of abstract, but there are other related functions, so they all use related glyphs. For example, [∧ fold](/docs/fold) has this nice symmetry with [/ reduce](/docs/reduce) and [\\ scan](/docs/scan). The indexing/finding/grouping functions like[⊛ classify](/docs/classify), [⊕ group](/docs/group), [◴ deduplicate](/docs/deduplicate), etc are all circles.
* I think they look like cute little guys: [⍤ assert](/docs/assert) and [⍣ try](/docs/try)

An additional constraint is that every glyph must be present in the [DejaVu Sans Mono](https://dejavu-fonts.github.io) font, which is the best-looking free monospace font I could find that supports the largest number of glyphs.

## [No Local Variables](#no-local-variables)

Forbidding general local variables has a few benefits:

* I don't have to implement them (score!)
* It forces you to write (often beautiful) tacit code, which I would argue Uiua enables better than almost any other programming language.
* It frees you from the burden of naming things.

## [Identifiers and Formatting](#identifiers-and-formatting)

I made the decision to have a formatter that turns names into Unicode glyphs about as soon as I started using Unicode glyphs. I did not want to require special keyboard or editor support like APL and BQN do.

The advantage of a file-watching formatter is that the only feature your editor needs is the ability to automatically reload files if they change on disk. You don't need special keybinds or plugins or anything.

The other nice thing about a formatter is that it makes it easier to get started with the language. You do not have to memorize a bunch of keyboard shortcuts to type the glyphs. You just need to learn their names.

## [Inspiration](#inspiration)

### BQN

The main language that inspired Uiua is [BQN](https://mlochbaum.github.io/BQN/). While I had heard about APL before, BQN was my first real exposure to the power of the array paradigm. I think the language is an astounding feat of engineering. Marshall is both a genius and a great communicator.

However, as you can read above, a lot of Uiua's design decisions are responses to things I _didn't_ like about BQN. There were a bunch of little pain-points that I thought I could improve on.

A lot of the behavior of Uiua's built-in functions (and the choice of which built-ins to include) is inspired by BQN's primitives. Just a few examples are [⍉ transpose](/docs/transpose), [⊛ classify](/docs/classify), [⊕ group](/docs/group), and [↙ take](/docs/take).

Another thing that was largely inspired by BQN is this website! BQN's site is excellent. I really like the way it is organized and the way it presents the language. I particularly liked the built-in editor, so I made my own version for Uiua that has syntax highlighting and history, which I reuse in all the tutorials and examples.
  
### The Array Cast

During the period of Uiua's development, I spent a lot of time listening to [The Array Cast](https://arraycast.com/), a podcast about array languages. The conversations about the design and implementation of APL, J, K, Q, and BQN are both inspirational and informative. The guys have such a depth and breadth of knowledge on the topic. I really recommend giving it a listen.

Thanks to [Con](https://github.com/codereport)[or](https://www.youtube.com/@code%5Freport), Bob, Stephen, Adám, [Marshall](https://github.com/mlochbaum), Richard, and all the guests.

</page>

<page url="https://www.uiua.org/docs/signature">

# [signature](/docs/signature)

### Monadic 0-argument modifier

⚠️ Warning 🧪: This modifier is experimental and may be changed or removed in the future. Experimental features can be enabled by putting an `# Experimental!` comment at the top of a program.

Get the signature of a function

```uiua
# Experimental!
[signature+]
```

```output
[2 1]
```

```uiua
# Experimental!
[signature°⊟]
```

```output
[1 2]
```

```uiua
# Experimental!
[signature(+++++++)]
```

```output
[8 1]
```

```uiua
# Experimental!
[signature⊙⊙⊙∘]
```

```output
[4 4]
```

```uiua
# Experimental!
[signature[⊙⊙⊙∘]]
```

```output
[4 1]
```

```uiua
# Experimental!
[signature°[⊙⊙⊙∘]]
```

```output
[1 4]
```
  
At the moment, this is only useful for debugging.

While theoretically, it could be used in a macro to choose a branch of a [⨬ switch](/docs/switch) appropriate for the function, this is not yet possible because of the way that macros and signature checking work.

</page>

<page url="https://www.uiua.org/docs/switch">

# [⨬ switch](/docs/switch)

### Dyadic modifier

Call the function at the given index

[⨬ switch](/docs/switch) takes at least 1 argument, an index.

If the index is `0`, the first function is called.

If the index is `1`, the second function is called.

```uiua
⨬+- 0 3 5
⨬+- 1 3 5
```

```output
8
2
```

The signatures of the functions do not need to match exactly.

Excess arguments will be discarded.

```uiua
⨬(×.)+ 0 3 5
⨬(×.)+ 1 3 5
```

```output
9
8
```

A function pack can be used to switch between more than 2 functions.

```uiua
⨬(+|-|×|÷) 0 2 5
⨬(+|-|×|÷) 1 2 5
⨬(+|-|×|÷) 2 2 5
⨬(+|-|×|÷) 3 2 5
```

```output
7
3
10
2.5
```

The index does not have to be a scalar.

```uiua
⨬(+|-|×|÷) [0 1 2 3] 2 5
```

```output
[7 3 10 2.5]
```

In this case, [⨬ switch](/docs/switch) behaves similarly to [≡ rows](/docs/rows). The index will be iterated along with other arguments.

```uiua
⨬(+|-|×|÷) [0 1 2 3] [1 6 10 2] 5
```

```output
[6 ¯1 50 2.5]
```

</page>

<page url="https://www.uiua.org/docs/try">

# [⍣ try](/docs/try)

### Dyadic modifier

Call a function and catch errors

If the first function errors, the second function is called with the original arguments and the error value.
  
If the handler function has 0 arguments, then it is simply called. This is a nice way to provide a default value.

```uiua
⍣⋕0 "5"
⍣⋕0 "dog"
```

```output
5
0
```

The handler function will be passed at most the same arguments as the tried function, plus the error. It will only be passed as many arguments as it takes.

Normal runtime errors become strings. If you only care about the error, you can use [⋅ gap](/docs/gap) or [◌ pop](/docs/pop) to ignore the arguments passed to the handler.

```uiua
⍣(+1)⋅$"Error: _" 2   # No error
```

```output
3
```

```uiua
⍣(+@a)⋅$"Error: _" @b # Error
```

```output
"Error: 1:3: Cannot add character and character"
```

Errors thrown with [⍤ assert](/docs/assert) can be any value.

```uiua
⍣(⍤5>10.)⋅(×5) 12 # No error
```

```output
12
```

```uiua
⍣(⍤5>10.)⋅(×5) 7  # Error
```

```output
25
```

We can see how values are passed to the handler by wrapping them in an array.

```uiua
⍣⋕{⊙∘} "5"   # No error
⍣⋕{⊙∘} "dog" # Error
```

```output
5
{"dog" "2:2: Cannot parse into number: invalid float literal"}
```

```uiua
⍣(⍤0.+)10    3 5 # Ignore both arguments and error
⍣(⍤0.+)¤     3 5 # First argument only
⍣(⍤0.+)⊟     3 5 # Both arguments
⍣(⍤0.+)[⊙⊙∘] 3 5 # Both arguments and error
```

```output
10
[3]
[3 5]
[3 5 0]
```

If we want to provide a default value from the stack, we can ignore it in the tried function with [⋅ gap](/docs/gap) and then use [∘ identity](/docs/identity) in the handler.

```uiua
⍣⋅⋕∘ 5 "12"  # No error
⍣⋅⋕∘ 5 "dog" # Error
```

```output
12
5
```

[⍣ try](/docs/try) works with function packs of more than 2 functions. Each function will by tried in order, and all functions after the first will be passed the error value from the previous function.

```uiua
F ← ⍣(⋕|{⊂2⊙∘}|{⊙∘})
F "5"
F [1]
F "hi"
```

```output
5
{[2 1] "1:7: Cannot parse number array"}
{"hi" "1:7: Cannot parse into number: invalid float literal"}
```

</page>

<page url="https://www.uiua.org/docs/reshape">

# [↯ reshape](/docs/reshape)

### Dyadic function

Change the shape of an array

```uiua
↯ 2_3 [1 2 3 4 5 6]
```

```output
╭─       
╷ 1 2 3  
  4 5 6  
        ╯
```

Shapes that have fewer elements than the original array will truncate it.

```uiua
↯ 2_2 [1_2_3 4_5_6]
```

```output
╭─     
╷ 1 2  
  3 4  
      ╯
```

Shapes that have more elements than the original array will cycle elements.

```uiua
↯ [5] 2
```

```output
[2 2 2 2 2]
```

```uiua
↯ 3_7 1_2_3_4
```

```output
╭─               
╷ 1 2 3 4 1 2 3  
  4 1 2 3 4 1 2  
  3 4 1 2 3 4 1  
                ╯
```
  
Scalar shapes will copy the array as rows of a new array.

```uiua
↯ 4 [1 2 3 4 5]
```

```output
╭─           
╷ 1 2 3 4 5  
  1 2 3 4 5  
  1 2 3 4 5  
  1 2 3 4 5  
            ╯
```

```uiua
↯ 2 [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
╷ 4 5 6  
         
  1 2 3  
  4 5 6  
        ╯
```

This is in constrast to scalar [▽ keep](/docs/keep), which repeats each row but preserves rank.

```uiua
▽ 4 [1 2 3 4 5]
```

```output
[1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4 5 5 5 5]
```

```uiua
▽ 2 [1_2_3 4_5_6]
```

```output
╭─       
╷ 1 2 3  
  1 2 3  
  4 5 6  
  4 5 6  
        ╯
```
  
[⬚ fill](/docs/fill)[↯ reshape](/docs/reshape) fills in the shape with the fill element instead of cycling the data.

```uiua
  ↯ 3_5 ⇡9
⬚0↯ 3_5 ⇡9
```

```output
╭─           
╷ 0 1 2 3 4  
  5 6 7 8 0  
  1 2 3 4 5  
            ╯
╭─           
╷ 0 1 2 3 4  
  5 6 7 8 0  
  0 0 0 0 0  
            ╯
```
  
At most one of the dimensions of the new shape may be [∞ infinity](/docs/infinity). This indicates that this is a _derived_ dimension, and it will be calculated to make the total number of elements in the new shape be [≤](/docs/less or equal) the total number of elements in the original shape.

```uiua
↯5_∞ ⇡15
```

```output
╭─          
╷  0  1  2  
   3  4  5  
   6  7  8  
   9 10 11  
  12 13 14  
           ╯
```

```uiua
↯∞_5 ⇡15
```

```output
╭─                
╷  0  1  2  3  4  
   5  6  7  8  9  
  10 11 12 13 14  
                 ╯
```

```uiua
↯2_2_∞ ⇡15
```

```output
╭─         
╷ 0  1  2  
╷ 3  4  5  
           
  6  7  8  
  9 10 11  
          ╯
```

```uiua
↯∞_2_2 ⇡15
```

```output
╭─       
╷  0  1  
╷  2  3  
         
   4  5  
   6  7  
         
   8  9  
  10 11  
        ╯
```

```uiua
↯3_∞_5 ⇡30
```

```output
╭─                
╷  0  1  2  3  4  
╷  5  6  7  8  9  
                  
  10 11 12 13 14  
  15 16 17 18 19  
                  
  20 21 22 23 24  
  25 26 27 28 29  
                 ╯
```

If [⬚ fill](/docs/fill) is used, the total number of elements in the new shape will always be [≥](/docs/greater or equal) the total number of elements in the original shape.

```uiua
⬚0↯ ∞_5 ⇡12
```

```output
╭─             
╷  0  1 2 3 4  
   5  6 7 8 9  
  10 11 0 0 0  
              ╯
```
  
[⍜ under](/docs/under)[△ shape](/docs/shape) will [↯ reshape](/docs/reshape) the array as an inverse.

```uiua
⍜△⇌. ↯2_3_4⇡24
```

```output
╭─             
╷  0  1  2  3  
╷  4  5  6  7  
   8  9 10 11  
               
  12 13 14 15  
  16 17 18 19  
  20 21 22 23  
              ╯
╭─       
╷  0  1  
╷  2  3  
   4  5  
         
   6  7  
   8  9  
  10 11  
         
  12 13  
  14 15  
  16 17  
         
  18 19  
  20 21  
  22 23  
        ╯
```
  
Negative axes in the shape will reverse the corresponding axes of the array.

```uiua
↯[¯3] 1_2_3
```

```output
[3 2 1]
```

```uiua
↯2_3_4⇡24
⍜△⍜(⊏0_2)¯
```

```output
╭─             
╷ 15 14 13 12  
╷ 19 18 17 16  
  23 22 21 20  
               
   3  2  1  0  
   7  6  5  4  
  11 10  9  8  
              ╯
```

```uiua
↯¯3 [1 2 3 4]
```

```output
╭─         
╷ 4 3 2 1  
  4 3 2 1  
  4 3 2 1  
          ╯
```

```uiua
↯¯∞ [1 2 3 4 5]
```

```output
[5 4 3 2 1]
```
  
See also: [♭ deshape](/docs/deshape)

</page>

<page url="https://www.uiua.org/docs/&httpsw">

# [&httpsw](/docs/&httpsw) \- https - Make an HTTP(S) request

### Dyadic function

Make an HTTP(S) request

Takes in an 1.x HTTP request and returns an HTTP response.
  
Requires the `Host` header to be set.

Using port 443 makes an HTTPS request. Any other port makes an HTTP request.
  
```uiua
&httpsw "GET / " &tcpc "example.com:443"
```
  
It is also possible to put in entire HTTP requests.
  
```uiua
&tcpc "example.com:443"
&httpsw $ GET /api HTTP/1.0
        $ Host: example.com\r\n
        $ <BODY>
```
  
There are a few things the function tries to automatically fill in if it finds they are missing from the request:

\- 2 trailing newlines (if there is no body)

\- The HTTP version

\- The `Host` header (if not defined)

</page>

<page url="https://www.uiua.org/blog/second-class-functions">

# Why doesn't Uiua have first-class functions? 

2023-12-15 

---

People often ask why Uiua doesn't have first-class functions. That is, functions that can be put on the stack and in arrays. 

In the beginning, functions _were_  normal array elements. Modifiers popped their functions from the stack like regular values. Functions could be put in arrays, and lists of functions even had some special uses. There was a `! call` function which called the top function on the stack. Boxes were not even a dedicated type. They were just functions that took no arguments and returned a single value. 

However, as Uiua's development continued, the language began to rely more and more on stack signatures being well-defined. This property catches errors early, enables some optimizations, and allows modifiers to behave differently depending on their function's siganture. That last point lets us avoid having multiple modifiers that work the same way but on different numbers of arguments. For example, [Factor](https://factorcode.org/) has the words `bi`,`2bi`, `3bi`, `tri`, `2tri`, and`3tri`. Uiua can express all of these and more with just [⊃ fork](/docs/fork).

Unfortunately, having first-class functions was at odds with this design. Because functions could be put into arrays and (conditionally) moved around on the stack, the compiler was not able to determine the signature of a function that called a function value. This meant that anywhere the `! call` function was used needed a signature annotation nearby, which you better hope was correct, or the code would break somewhere else. It also incurred additional interpreter overhead to get the functions from arrays and made certain types of optimizations impossible. 

Other than these design and implementation concerns, the ability to move functions around on the stack made code much harder to read when it was used. You had to keep in your mind not only the values, but the functions that worked on them as well. They were another value you had to deal with, and the related stack manipulation could get quite messy. 

And so I settled on a different approach. Functions were removed as an element type and were put elsewhere in the interpreter. Boxes became a type in their own right. The `! call` function was removed, and `!` was repurposed to be part of defining custom modifiers. [Custom modifiers](/docs/custommodifiers) capture the primary use case of first-class functions: injecting some variable code into a function. While they are technically more limited, their uniform structure makes them easier to both read and write. This change also massively simplified the interpreter, as well as the complexity of the language itself. 

Despite the downgrading of functions to second-class status, it should be noted that I do like functional programming languages. I just don't think that first-class functions are a good fit for Uiua. In practice, first-class functions are mostly unnecessary if you have higher-order functions, which array languages have had for decades. APL's operators, J's adverbs and conjunctions, and BQN and Uiua's modifiers are all versions of higher-order functions. They allow the mapping, reduction, and general transformation of data in the same way that first-class functions do in other languages. 

Now if only I could find a way to get rid of boxes...

</page>

<page url="https://www.uiua.org/docs/&tlsc">

# [&tlsc](/docs/&tlsc) \- tls - connect

### Monadic function

Create a TCP socket with TLS support

Returns a stream handle

You can make a request with [&w](/docs/&w) and read the response with [&rs](/docs/&rs), [&rb](/docs/&rb), or [&ru](/docs/&ru).

[⍜ under](/docs/under)[&tlsc](/docs/&tlsc) calls [&cl](/docs/&cl) automatically.

```uiua

```
  
See also: [&tcpc](/docs/&tcpc)

</page>

<page url="https://www.uiua.org/tutorial/basic">

# Basic Stack Operations and Formatting

## [The Stack](#the-stack)

In Uiua, all operations operate on a global stack. Lines of code are evaluated from [right to left](/docs/rtl), top to bottom.

A number simply pushes its value onto the stack.

```uiua
5
```

```output
5
```

```uiua
1 2 3
```

```output
3
2
1
```

Operators pop values off the stack and push their results.

For example, [+](/docs/add) pops two values off the stack and pushes their sum.

```uiua
+ 1 2
```

```output
3
```

[×](/docs/multiply), of course, multiplies the two values instead.

```uiua
+ 1 × 2 3
```

```output
7
```

In the editor, items that end up on the _top_ of the stack are shown at the _bottom_ of the output. This is so that consecutive lines of code show their outputs in the correct order.

```uiua
5
+1 2
"Hello, World!"
+1 @a
```

```output
5
3
"Hello, World!"
@b
```

This orientation can be changed in the editor's settings. Click the ⚙️ icon in the top right corner of the editor to see them.

Operations can span multiple lines. Every line uses the same stack!

```uiua
1 2
+
5
×
```

```output
15
```

## [Comments](#comments)

Comments are denoted with `#` and run to the end of the line.

```uiua
5 # This is a comment
```

```output
5
```

Uiua does not have multiline comments.

## [Formatting](#formatting)

Most Uiua built-in functions use special Unicode characters. To type multiplication and division signs, you can use `*` and `%` respectively. Then, run the code to format the ASCII characters into Unicode.

```uiua
# Click Run to format!
%6 *3 8
```

```output
4
```

Most built-in functions have names you can type rather than symbols. Formatting works on these too. _**This is the primary way of entering Uiua's glyphs.**_

Try formatting the lines below by clicking **Run**.

```uiua
max sqrt 10 mod 10 pow 2 8
```

```output
4
```

```uiua
abs +`1 `2
```

```output
3
```

You don't have to type the whole name, just enough to disambiguate it from others.

```uiua
cei 1.5
ceil 1.5
ceili 1.5
ceilin 1.5
ceiling 1.5
```

```output
2
2
2
2
2
```

You don't even have to remove spaces between built-in function names. The formatter will figure it out!

```uiua
roundsqrtpi
```

```output
2
```

On this site, you can also click the ↧ symbol on any editor to show a palette of all the Uiua glyphs. You can then click on any glyph to insert it into the editor.

Here is a table of all the glyphs that are typed with ASCII characters that get converted to glyphs.

| Name             | ASCII | Glyph                       |
| ---------------- | ----- | --------------------------- |
| negate           | \`    | [¯](/docs/negate)           |
| not equals       | !=    | [≠](/docs/not equals)       |
| less or equal    | <=    | [≤](/docs/less or equal)    |
| greater or equal | \>=   | [≥](/docs/greater or equal) |
| multiply         | \*    | [×](/docs/multiply)         |
| divide           | %     | [÷](/docs/divide)           |
| negative number  | \`    | ¯                           |

As noted in the table, negative number literals are typed with the `` ` `` character. This is because `-` is used for subtraction.

```uiua
+ `1 `2
```

```output
¯3
```

The formatter will align consecutive end-of-line comments. Try it out!

```uiua
%2 8 # Line
@x # these
1 # up
```

```output
4
@x
1
```

### Output Comments

A comment that starts with additional `#`s is an _output comment_. The formatter replaces the text of an output comment with as many values from the stack as there are extra `#`s.

Click Run to try it out!

```uiua
1 2 3
####
+
###
+
##
```

```output
6
```

## [Stack Functions](#stack-functions)

There are a few functions that work on the stack itself. Some of these are critical and can be found scattered across all Uiua code.

## [](#dup)[. duplicate](/docs/duplicate)

[. duplicate](/docs/duplicate) duplicates the top item on the stack.

In general, functions do not leave their arguments on the stack. If you want to reuse a value, the most basic way is to [. duplicate](/docs/duplicate) it first.

For example, if you wanted to square a number, you could [. duplicate](/docs/duplicate) it, then [× multiply](/docs/multiply).

```uiua
×.4
```

```output
16
```

[. duplicate](/docs/duplicate) is often used in the examples on this site to show both the input and output of a function.

```uiua
√.144
```

```output
144
12
```
  
## [](#flip)[: flip](/docs/flip)

[: flip](/docs/flip) swaps the top two items on the stack.

This is useful when you want to call a function that takes two arguments, but the arguments are on the stack in the wrong order.

For example, if you wanted to get the reciprocal of a number, you would [÷ divide](/docs/divide) `1` by it. But, if the number is already on the stack, you would need to use [: flip](/docs/flip).

```uiua
÷1 5
```

```output
5
```

```uiua
÷:1 5
```

```output
0.2
```

```uiua
:1 2 3 4 5
```

```output
5
4
3
1
2
```
  
## [](#over)[, over](/docs/over)

[, over](/docs/over) is like [. duplicate](/docs/duplicate), but it duplicates the second item on the stack instead of the first.

```uiua
,1 2 3 4
```

```output
4
3
2
1
2
```

```uiua
+×, 3 5
```

```output
20
```
  
## [](#pop)[◌ pop](/docs/pop)

[◌ pop](/docs/pop) removes the top item from the stack.

This is useful when you want to discard a value that you do not need.

```uiua
1 pop 2 3 4 ◌ 5 6
```

```output
6
4
3
1
```

## [](#stack-and-trace)[? stack](/docs/stack) and [⸮ trace](/docs/trace)

[? stack](/docs/stack) prints the entire stack.

It also attaches line and column numbers.

This is useful for debugging by inspecting the stack.

```uiua
√+ ? .+ ? 1 ×3 4
```

```output
┌╴? 1:9
├╴12
├╴1
└╴╴╴╴╴╴
┌╴? 1:4
├╴13
├╴13
└╴╴╴╴╴╴

5.0990195135927845
```

[⸮ trace](/docs/trace) prints only the top item on the stack.

```uiua
+1 ⸮ ×4 trace ×. -3 5
```

```output
┌╴1:9
├╴4
└╴╴╴╴
┌╴1:4
├╴16
└╴╴╴╴

17
```

</page>