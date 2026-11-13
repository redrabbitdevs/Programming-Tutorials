(module
  (memory (export "memory") 1)

  ;; Turn ASCII a-z into A-Z in place, for $len bytes from $ptr.
  (func (export "upper") (param $ptr i32) (param $len i32)
    (local $end i32)
    (local $c i32)
    (local.set $end (i32.add (local.get $ptr) (local.get $len)))
    (block $done
      (loop $next
        (br_if $done (i32.ge_u (local.get $ptr) (local.get $end)))
        (local.set $c (i32.load8_u (local.get $ptr)))
        (if (i32.and (i32.ge_u (local.get $c) (i32.const 97))
                     (i32.le_u (local.get $c) (i32.const 122)))
          (then (i32.store8 (local.get $ptr)
                  (i32.sub (local.get $c) (i32.const 32)))))
        (local.set $ptr (i32.add (local.get $ptr) (i32.const 1)))
        (br $next))))

  ;; Grow memory by $pages 64 KiB pages; returns the old size in pages.
  (func (export "grow") (param $pages i32) (result i32)
    (memory.grow (local.get $pages)))
)
