# Module A4 (Metaprogramming): version extracts

Fetched 2026-10-12 with `curl -sL` from docs.python.org/3.15/ (serving 3.15.0) and peps.python.org.
Each line is quoted from the page named, then the claim it supports. Behaviour marked
"checked" was also run on python3.13, 3.14 and 3.15 in this environment.

## Descriptors and class creation hooks (reference/datamodel.html)
- `object.__init_subclass__(cls)`: "Added in version 3.6." PEP 487 Python-Version: 3.6, Status: Final.
- `object.__set_name__(self, owner, name)`: "Added in version 3.6." (PEP 487)
- "When using the default metaclass type, or any metaclass that ultimately calls type.__new__, the
  following additional customization steps are invoked after creating the class object: The type.__new__
  method collects all of the attributes in the class namespace that define a __set_name__() method;
  Those __set_name__ methods are called ...; The __init_subclass__() hook is called on the immediate
  parent of the new class ...; After the class object is created, it is passed to the class decorators".
- `__class_getitem__`: PEP 560 Python-Version: 3.7, Status: Final. Datamodel: "When defined on a class,
  __class_getitem__() is automatically a class method." "Using __class_getitem__() on any class for
  purposes other than type hinting is discouraged."
- "If the metaclass has a __prepare__ attribute, it is called as namespace = metaclass.__prepare__(name,
  bases, **kwds)".
- `__slots__`: "__slots__ are implemented at the class level by creating descriptors for each variable name."
  "Changed in version 3.15: Allowed defining the __dict__ and __weakref__ __slots__ for any class.
  Allowed defining any __slots__ for a class derived from tuple." Checked: 3.14 raises
  "nonempty __slots__ not supported for subtype of 'tuple'", 3.15 accepts.
- whatsnew/3.15: "The __dict__ and __weakref__ descriptors now use a single descriptor instance per
  interpreter ... This speeds up class creation" (internal, not taught).

## PEP 649/749 and class creation (3.14)
- library/annotationlib.html `get_annotate_from_class_namespace(namespace)`: "Retrieve the annotate function
  from a class namespace dictionary namespace. Return None if the namespace does not contain an annotate
  function. This is primarily useful before the class has been fully created (e.g., in a metaclass)".
  "Added in version 3.14."
- annotationlib recipe "Using annotations in a metaclass": "For classes created with from __future__
  import annotations, the annotations will be in the __annotations__ key of the dictionary. For other
  classes with annotations, get_annotate_from_class_namespace() can be used ... and
  call_annotate_function() can be used to call it ... Using the FORWARDREF format will usually be best".
- whatsnew/3.14: "do not read annotations directly from the namespace dictionary attribute of type
  objects. Use annotationlib.get_annotate_from_class_namespace() during class construction and
  annotationlib.get_annotations() afterwards." "In previous releases, it was sometimes possible to access
  class annotations from an instance of an annotated class ... will no longer work in Python 3.14."
- PEP 749: "Users should not access the class dictionary directly for accessing annotations or the
  annotate function". Checked: on 3.13 the metaclass namespace has `__annotations__`; on 3.14/3.15 it
  does not.

## functools / descriptors
- library/functools.html `cached_property`: "Added in version 3.8." "Changed in version 3.12: Prior to
  Python 3.12, @cached_property included an undocumented lock".
- whatsnew/3.14 porting: "functools.partial is now a method descriptor. Wrap it in staticmethod() if you
  want to preserve the old behavior."
- whatsnew/3.15 functools: "singledispatchmethod() now supports non-descriptor callables." (not taught)

## contextlib (library/contextlib.html)
- `chdir(path)`: "Non parallel-safe context manager to change the current working directory ... This
  context manager is reentrant. Added in version 3.11."
- `asynccontextmanager`: "Added in version 3.7." "Changed in version 3.10: Async context managers created
  with @asynccontextmanager can be used as decorators."
- `AsyncExitStack`: "Added in version 3.7." `ExitStack`: "Added in version 3.3."
- `ExitStack.callback`: "callbacks added this way cannot suppress exceptions". `pop_all()`: "Transfers the
  callback stack to a fresh ExitStack instance and returns it. No callbacks are invoked by this operation".
- `enter_context`: "Changed in version 3.11: Raises TypeError instead of AttributeError if cm is not a
  context manager." "Changed in version 3.15: Added support for arbitrary descriptors __enter__() and
  __exit__()."
- `ContextDecorator`: "Added in version 3.2." "Changed in version 3.15: Decorating a generator function,
  coroutine function, or asynchronous generator function now keeps the context manager open across
  iteration or await. Previously the context manager exited as soon as the generator or coroutine object
  was created." Checked: 3.14 prints open/close before the first value, 3.15 after the last.

## Template strings: 3.14 (PEP 750, Final, Python-Version 3.14)
- library/string.templatelib.html: "Added in version 3.14." "It is immutable". "The strings tuple has one
  more element than interpolations and values". "Empty strings are not included in the iteration".
  "Concatenating a Template and a str is not supported."
- Interpolation: "value", "expression ... ending before the first !, :, or = if any is present",
  "conversion: Literal['a', 'r', 's'] | None", "format_spec". "Unlike f-strings, where conversions are
  applied automatically, the expected behavior with t-strings is that code that processes the Template
  will decide how to interpret and whether to apply the conversion." `convert(obj, /, conversion)`.
- whatsnew/3.15: "Add t-string support to pprint." (not taught)
- Checked: `str(t"...")` returns the same text as `repr()`; there is no rendering.

## ast / inspect / dis / types
- ast.unparse: "Added in version 3.9." ast.compare: "Added in version 3.14."
- ast.dump: "Changed in version 3.9: Added the indent option." "Changed in version 3.13: Added the
  show_empty option." "Changed in version 3.15: Omit optional Load() values by default." "Changed in
  version 3.15: Added the color parameter." Checked: 3.14 prints `ctx=Load()`, 3.15 does not.
- whatsnew/3.15 removed: "The constructors of AST nodes now raise a TypeError when a required argument is
  omitted or when a keyword argument that does not map to a field on the AST node is passed. These cases
  had previously raised a DeprecationWarning since Python 3.13."
- whatsnew/3.15 deprecated: "Creating instances of abstract AST nodes (such as ast.AST or ast.expr) is
  deprecated and will raise an error in Python 3.20."
- inspect "Introspecting callables with the Signature object": "Added in version 3.3."
  `inspect.signature(..., annotation_format=Format.VALUE)`: whatsnew/3.14 "signature() takes a new argument
  annotation_format". `inspect.get_annotations`: "Added in version 3.10." "Changed in version 3.14: This
  function is now an alias for annotationlib.get_annotations()."
- whatsnew/3.14 dis: "show_positions" keyword and `--specialized` CLI option.
- whatsnew/3.15 types: "Removed codeobject.co_lnotab from types.CodeType"; "Expose the write-through
  locals() proxy type as types.FrameLocalsProxyType." (not taught)
