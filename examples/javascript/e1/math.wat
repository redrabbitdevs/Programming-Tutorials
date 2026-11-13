(module
  (import "env" "report" (func $report (param i32)))
  (memory (export "memory") 1)

  (func (export "add") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)

  ;; Sum $count 32-bit integers stored in memory from byte offset $ptr.
  (func (export "sum") (param $ptr i32) (param $count i32) (result i32)
    (local $total i32)
    (block $done
      (loop $next
        (br_if $done (i32.eqz (local.get $count)))
        (local.set $total
          (i32.add (local.get $total) (i32.load (local.get $ptr))))
        (local.set $ptr (i32.add (local.get $ptr) (i32.const 4)))
        (local.set $count (i32.sub (local.get $count) (i32.const 1)))
        (br $next)))
    (call $report (local.get $total))
    local.get $total)
)
