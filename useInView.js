import { useRef ,useCallback, useState } from "react";

// first parameter will be used to decide 
// if user wants to change inView only once or not

// second parameter is for config of observer
export const useInView = (once = false , observer) => {
    // state that will show element is in the view or not
    const [inView , setInView] = useState(false)

    // store the observer
    const observer = useRef(null)

    // create a ref with use callback and access the element
    const ref = useCallback((node) => {
        // if observer exists disconnect
        if(observer.current) observer.current.disconnect()

        // set a new observer who will watch for intersection
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting){
                setInView(true)
                return
            }
            if(!once && !entries[0].isIntersecting){
                setInView(false)
                return
            }
        },config ?? {})

        // use new observer and observer the node if exists
        if(node) observer.current.observe(node)
    },[])

    return [ref , inView]
    
}