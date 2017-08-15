<?php

namespace VisualComposer\Helpers;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Illuminate\Support\Helper;

/**
 * Helper methods related to data manipulation.
 * Class Data.
 */
class Data implements Helper
{
    /**
     * @param $array
     * @param $column
     * @param $value
     *
     * @return bool|int|string
     */
    public function arraySearch($array, $column, $value)
    {
        if (!is_array($array)) {
            return false;
        }
        foreach ($array as $key => $innerArray) {
            $exists = isset($innerArray[ $column ]) && $innerArray[ $column ] == $value;
            if ($exists) {
                return $innerArray;
            }
        }

        return false;
    }

    /**
     * @param $array
     * @param $column
     * @param bool $returnValue
     *
     * @return bool|int|string
     */
    public function arraySearchKey($array, $column, $returnValue = false)
    {
        if (!is_array($array)) {
            return false;
        }
        foreach ($array as $key => $innerArray) {
            $exists = isset($innerArray[ $column ]);
            if ($exists) {
                if ($returnValue) {
                    return $innerArray[ $column ];
                } else {
                    return $key;
                }
            }
        }

        return false;
    }

    public function arrayColumn($array, $columnName)
    {
        return array_map(
            function ($element) use ($columnName) {
                return $element[ $columnName ];
            },
            $array
        );
    }
}
